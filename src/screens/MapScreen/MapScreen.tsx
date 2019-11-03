import React, { useState, useEffect, useContext } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  FAB,
  Provider as PaperProvider,
  DefaultTheme
} from "react-native-paper";

import ActionBar from "./components/ActionBar";
import AddMarkerDialog from "./components/AddMarkerDialog";
import MarkerDetailDialog from "./components/MarkerDetailDialog";
import { MarkerDetails } from "../../interfaces/MarkerDetails";

import Markers, { IMarker, GeoPoint } from "../../database/markers";
import { UserContext } from "../../authentication/userContext";

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [showAddMarkerDialog, setShowAddMarkerDialog] = useState(false);
  const [showMarkerDetail, setShowMarkerDetail] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string>("");
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

  // useEffect(() => {
  //   const interval = setInterval(getCurrentGPSLocation, 5000);
  //   return () => clearInterval(interval);
  // }, []);

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
      console.log(markers);
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

  const toggleFab = () => setShowAddMarkerDialog(!showAddMarkerDialog);
  const toggleMarkerDetailDialog = () => setShowMarkerDetail(!showMarkerDetail);
  const caca = () => console.log("Hola");

  return (
    <PaperProvider theme={theme}>
      <ActionBar />
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
                console.log("showMarkerDetail");
                // toggleMarkerDetailDialog();
                // setSelectedMarker(marker.id);
              }}
            />
          ))}

          <Marker
            style={{ width: 32, height: 32 }}
            key='My Location'
            coordinate={currentLocation}
            onPress={caca}
            image={require("../../../assets/images/gps.png")}
          />
        </MapView>

        <FAB style={styles.fab} icon='plus' onPress={toggleFab} />

        {/* <MarkerDetailDialog
          isVisible={showMarkerDetail}
          toggle={toggleMarkerDetailDialog}
          markerId={selectedMarker}
        /> */}

        <AddMarkerDialog isVisible={showAddMarkerDialog} toggle={toggleFab} />
      </View>
    </PaperProvider>
  );
}

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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196f3",
    accent: "#1de9b6"
  }
};
