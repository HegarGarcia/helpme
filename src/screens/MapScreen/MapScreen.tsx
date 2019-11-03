import React, { useState } from "react";
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

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [markerDetails, setMarkerDetails] = useState<MarkerDetails>({
    coords: { latitude: 0, longitude: 0 },
    userId: " ",
    who: " ",
    what: " ",
    where: " ",
    photoUrl: " "
  });
  const [location, setLocation] = useState<Location>({
    latitude: 19.246346,
    longitude: -103.725337
  });

  const toggleFab = () => setVisible(!isVisible);
  const showDetailToggle = () => setShowDetail(!showDetail);

  const putMarker = coord => {
    setMarkers([...markers, coord]);
    console.log(coord);
  };

  const getCurrentGPSLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  let region = {
    latitude: 19.246346,
    longitude: -103.725337,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <PaperProvider theme={theme}>
      <ActionBar />
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          onMapReady={getCurrentGPSLocation}
          style={styles.mapStyle}
          onPress={e => putMarker(e.nativeEvent.coordinate)}
        >
          {markers.map(marker => (
            <Marker
              title={"something"}
              key={marker}
              coordinate={marker}
              onPress={() => {
                setMarkerDetails({ ...markerDetails, coords: marker });
                showDetailToggle();
              }}
            />
          ))}

          <Marker
            style={{ width: 32, height: 32 }}
            key="My Location"
            coordinate={location}
            image={require("../../../assets/images/gps.png")}
          ></Marker>
        </MapView>

        <FAB style={styles.fab} icon="plus" onPress={toggleFab} />
        <MarkerDetailDialog
          isVisible={showDetail}
          toggle={showDetailToggle}
          markerDetails={markerDetails}
        />
        <AddMarkerDialog isVisible={isVisible} toggle={toggleFab} />
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
