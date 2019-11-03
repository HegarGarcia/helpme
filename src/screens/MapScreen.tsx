import React, { useState, useEffect, useContext, FC } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { FAB, Appbar } from "react-native-paper";

import ActionBar from "../components/ActionBar";
import AddMarkerDialog from "../components/AddMarkerDialog";
import MarkerDetailDialog from "../components/MarkerDetailDialog";

import Markers, { IMarker, GeoPoint } from "../database/markers";
import { UserContext } from "../authentication/userContext";
import { NavigationScreenProp } from "react-navigation";
import ProfileDetailDialog from "../components/ProfileDetailDialog";

interface Location {
  latitude: number;
  longitude: number;
}

interface MapScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const MapScreen: FC<MapScreenProps> = ({ navigation }) => {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [showAddMarkerDialog, setShowAddMarkerDialog] = useState(false);
  const [showMarkerDetail, setShowMarkerDetail] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string>("");
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const { user } = useContext(UserContext);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    latitude: 19.246346,
    longitude: -103.725337
  });

  const region = {
    ...currentLocation,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  useEffect(() => {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ["Setting timer"];
  });

  useEffect(() => {
    const interval = setInterval(getCurrentGPSLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      console.log("Started");
      const snapshot = await Markers.getWithinRadius(
        300,
        new GeoPoint(currentLocation.latitude, currentLocation.longitude)
      );
      setMarkers(
        snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IMarker))
      );
    })();
  }, [currentLocation]);

  const getCurrentGPSLocation = () => {
    navigator.geolocation.getCurrentPosition(position =>
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    );
  };

  const toggleAddMarker = () => setShowAddMarkerDialog(!showAddMarkerDialog);
  const toggleMarkerDetailDialog = () => setShowMarkerDetail(!showMarkerDetail);
  const toggleProfileDetail = () => setShowProfileDetail(!showProfileDetail);

  return (
    <>
      <ActionBar>
        <Appbar.Action icon='account' onPress={toggleProfileDetail} />
      </ActionBar>
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          onMapReady={getCurrentGPSLocation}
          style={styles.mapStyle}>
          {markers.map(marker => (
            <Marker
              title={"Marcador"}
              key={marker.id}
              coordinate={marker.coordinates}
              onPress={() => {
                setSelectedMarker(marker.id);
                toggleMarkerDetailDialog();
              }}
            />
          ))}

          <Marker
            style={{ width: 32, height: 32 }}
            key='My Location'
            coordinate={currentLocation}
            image={require("../../assets/images/gps.png")}
          />
        </MapView>

        <FAB style={styles.fab} icon='plus' onPress={toggleAddMarker} />

        {showProfileDetail && (
          <ProfileDetailDialog
            goToProfile={() => navigation.navigate("Profile")}
            toggleVisibility={toggleProfileDetail}
          />
        )}

        {showMarkerDetail && (
          <MarkerDetailDialog
            toggleVisibility={toggleMarkerDetailDialog}
            markerId={selectedMarker}
          />
        )}

        {showAddMarkerDialog && (
          <AddMarkerDialog toggleVisibility={toggleAddMarker} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default MapScreen;
