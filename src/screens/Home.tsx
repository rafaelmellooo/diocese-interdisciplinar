import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import api from '../services/api';
import { parse } from 'node-html-parser';

interface ItemProperties {
    name: string;
    description: string;
    icon: string;
    distance: string;
}

interface Item {
    id: number;
    geometry: {
        coordinates: number[];
    },
    properties: ItemProperties;
}

interface Response {
    features: Item[];
}

export default function Home() {
    //const [location, setLocation] = useState<Location.LocationObject>();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getLocation();

        (async () => {
            try {
                const response = await api.post<Response>('https://www.diocesedesantos.com.br/horarios-das-missas', {
                    format: 'json',
                    latitude: -23.9387,
                    longitude: -46.3433,
                    searchzip: 'Sua Localização (Você)',
                    component: 'com_mymaplocations',
                    tags: [70, 71]
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                // console.log(response.data.features[0].id);
                // console.log(response.data.features[0].geometry.coordinates);
                // console.log(response.data.features[0].properties.name);
    
                // const root = parse(response.data.features[0].properties.description);
                // console.log(root.querySelector('.locationaddress')?.text);
    
                // console.log(response.data.features[0].properties.icon);
                // console.log(response.data.features[0].properties.distance);

                response.data.features = response.data.features.map(item => {
                    item.properties.name = parse(item.properties.name).text;

                    return item;
                });

                setItems(response.data.features);
            } catch (exception) {
                console.log(exception);
            }
        })();
    }, []);

    const getLocation = async () => {
        // const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

        // if (status !== Location.PermissionStatus.GRANTED) {
        //     if (!canAskAgain) {
        //         console.log('A permissão foi negada e não pode ser solicitada novamente. Você precisará ir às configurações para alterar a permissão');
        //         return;
        //     }

        //     console.log('Não foi possível acessar a localização, a permissão foi negada');
        //     return;
        // }

        // const location = await Location.getCurrentPositionAsync({});
        // setLocation(location);
    }

    // if (!location) {
    //     return (
    //         <View style={styles.container}>
    //             <Text>Waiting for location...</Text>
    //         </View>
    //     );
    // }

    if (!items) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    //latitude: location.coords.latitude,
                    latitude: -23.9387,
                    latitudeDelta: 0.1,
                    //longitude: location.coords.longitude,
                    longitude: -46.3433,
                    longitudeDelta: 0.1
                }}
            >
                {items.map(item => (
                    <Marker
                        key={item.id}
                        coordinate={{
                            latitude: item.geometry.coordinates[1],
                            longitude: item.geometry.coordinates[0]
                        }}
                        title={item.properties.name}
                    >
                        <Image
                            source={{
                                uri: item.properties.icon,
                                cache: 'default'
                            }}
                            style={{
                                width: 42,
                                height: 60
                            }}
                        />
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: '100%'
    }
});
