import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';

export default function Home() {
    const [location, setLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            if (!canAskAgain) {
                console.log('A permissão foi negada e não pode ser solicitada novamente. Você precisará ir às configurações para alterar a permissão');
                return;
            }

            console.log('Não foi possível acessar a localização, a permissão foi negada');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    if (!location) {
        return (
            <View style={styles.container}>
                <Text>Waiting for location...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    latitudeDelta: 0.1,
                    longitude: location.coords.longitude,
                    longitudeDelta: 0.1
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '50%'
    }
});
