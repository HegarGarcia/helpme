import React, { useState, useEffect, FC } from "react";
import { NavigationScreenProp } from "react-navigation";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB, Appbar } from "react-native-paper";

import ActionBar from "../components/ActionBar";
import AddMarkerDialog from "../components/AddMarkerDialog";
import MarkerDetailDialog from "../components/MarkerDetailDialog";
import ProfileDetailDialog from "../components/ProfileDetailDialog";

import Markers, {
  IMarker,
  GeoPoint,
  Coordinates,
  colorMapper
} from "../database/markers";

interface MapScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const MapScreen: FC<MapScreenProps> = ({ navigation }) => {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [showAddMarkerDialog, setShowAddMarkerDialog] = useState(false);
  const [showMarkerDetail, setShowMarkerDetail] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string>("");
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ["Setting timer"];
  });

  useEffect(() => {
    (async () => {
      const snapshot = await Markers.getWithinRadius(
        20000,
        new GeoPoint(currentLocation.latitude, currentLocation.longitude)
      );
      setMarkers(
        snapshot.docs
          .map(doc => ({ ...doc.data(), id: doc.id } as IMarker))
          .filter(marker => !marker.attended)
      );
    })();
  }, [currentLocation]);

  const getMapRegion = () => ({
    ...currentLocation,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  });

  const onUserLocationChange = event => {
    event.persist();
    const { coordinate } = event.nativeEvent;
    setCurrentLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    });
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
          showsUserLocation
          showsMyLocationButton
          loadingEnabled
          region={getMapRegion()}
          onUserLocationChange={onUserLocationChange}
          style={styles.mapStyle}>
          {markers.map(marker => (
            <Marker
              pinColor={colorMapper(marker.necessity)}
              title={"Marcador"}
              key={marker.id}
              coordinate={marker.coordinates}
              onPress={() => {
                setSelectedMarker(marker.id);
                toggleMarkerDetailDialog();
              }}
            />
          ))}
        </MapView>

        <FAB style={styles.fab} icon='plus' onPress={toggleAddMarker} />

        {showProfileDetail && (
          <ProfileDetailDialog
            goToProfile={() => {
              navigation.navigate("Profile");
              toggleProfileDetail();
            }}
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
          <AddMarkerDialog
            currentLocation={currentLocation}
            toggleVisibility={toggleAddMarker}
          />
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
