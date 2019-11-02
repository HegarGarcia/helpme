import React, { useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  Image
} from "react-native";
import {
  FAB,
  Provider as PaperProvider,
  Dialog,
  Portal,
  Paragraph
} from "react-native-paper";

import ActionBar from "./ActionBar";

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [location, setLocation] = useState<Location>({
    latitude: 19.4256,
    longitude: -103.2956
  });

  const _showDialog = () => setVisible(true);
  const _hideDialog = () => setVisible(false);

  const putMarker = coord => {
    setMarkers(currentMarkers => [...markers, coord]);
    console.log(coord);
  };

  const setCurrentGPSLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  let region = {
    latitude: 19.4256,
    longitude: -103.2956,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <PaperProvider>
      <ActionBar></ActionBar>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 19.246346,
            longitude: -103.725337,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onMapReady={setCurrentGPSLocation}
          style={styles.mapStyle}
          onPress={e => putMarker(e.nativeEvent.coordinate)}
        >
          {markers.map(marker => (
            <Marker
              title={"something"}
              key={marker}
              coordinate={marker}
              onPress={e => console.log(marker)}
            ></Marker>
          ))}
          <Marker
            style={{ width: 32, height: 32 }}
            key="My Location"
            coordinate={location}
            image={require("../../../assets/images/gps.png")}
          ></Marker>
        </MapView>
        <FAB style={styles.fab} icon="plus" onPress={_showDialog} />
        <Portal>
          <Dialog visible={isVisible} onDismiss={_hideDialog}>
            <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
            <Dialog.Content>
              <Paragraph>¿Quien lo necesita?</Paragraph>
              <TextInput
                placeholder={"Nombre o forma de identificarlo "}
              ></TextInput>

              <Paragraph>¿Que se necesita?</Paragraph>
              <TextInput placeholder={"Ej: Zapatos, Ropa, Agua"}></TextInput>
            </Dialog.Content>
            <Dialog.Actions>
              <Button title={"Publicar"} onPress={_hideDialog}></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
