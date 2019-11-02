import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, TextInput } from 'react-native';
import { FAB, Provider as PaperProvider, Dialog, Portal, Paragraph } from 'react-native-paper';

export default function MapScreen() {
    const [markers, setMarkers] = useState([])
    const [isVisible, setVisible] = useState(false)

    function putMarker(coord) {
        setMarkers(currentMarkers => [...markers, coord])
        console.log(coord)
    }

    const _showDialog = () => setVisible(true)
    const _hideDialog = () => setVisible(false)

    const region = {
        latitude: 19.246853,
        longitude: -103.72543,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <MapView
                    initialRegion={region}
                    style={styles.mapStyle}
                    onPress={(e) => putMarker(e.nativeEvent.coordinate)}>
                    {
                        markers.map(marker =>
                            <Marker title={"something"} key={marker} coordinate={marker} onPress={(e) => console.log(e.nativeEvent)}></Marker>)
                    }
                </MapView>
                <FAB style={styles.fab}
                    icon="plus"
                    onPress={_showDialog}
                />
                <Portal>
                    <Dialog
                        visible={isVisible}
                        onDismiss={_hideDialog}>
                        <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>¿Quien lo necesita?</Paragraph>
                            <TextInput placeholder={"Nombre o forma de identificarlo "}></TextInput>

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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
});