import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image, ImageRequireSource, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import * as htmlparser2 from "htmlparser2";
import { Ionicons } from '@expo/vector-icons';

import { Chapel } from '../../interfaces/Chapel';
import ChapelPreview from '../../components/ChapelPreview';
import { findChapels } from '../../services/diocese.api';
import { styles } from './styles';

const markers: Record<string, ImageRequireSource> = {
    'bertioga': require('../../../assets/markers/icon-bertioga.png'),
    'cidade-santos': require('../../../assets/markers/icon-cidade-santos.png'),
    'cubatao': require('../../../assets/markers/icon-cubatao.png'),
    'guaruja': require('../../../assets/markers/icon-guaruja.png'),
    'itanhaem': require('../../../assets/markers/icon-itanhaem.png'),
    'mongagua': require('../../../assets/markers/icon-mongagua.png'),
    'peruibe': require('../../../assets/markers/icon-peruibe.png'),
    'praiagrande': require('../../../assets/markers/icon-praiagrande.png'),
    'sv': require('../../../assets/markers/icon-sv.png'),
};

const cities = [
    {
        key: 60,
        value: 'Bertioga - SP'
    },
    {
        key: 57,
        value: 'Cubatão - SP'
    },
    {
        key: 58,
        value: 'Guarujá - SP'
    },
    {
        key: 61,
        value: 'Itanhaém - SP'
    },
    {
        key: 63,
        value: 'Mongaguá - SP'
    },
    {
        key: 62,
        value: 'Peruíbe - SP'
    },
    {
        key: 64,
        value: 'Praia Grande - SP'
    },
    {
        key: 59,
        value: 'Santos - SP'
    },
    {
        key: 56,
        value: 'São Vicente - SP'
    }
];

export default function Home() {
    //const [location, setLocation] = useState<Location.LocationObject>();
    const [selectedCity, setSelectedCity] = useState<number>();
    const [chapels, setChapels] = useState<Chapel[]>([]);

    const dimensions = useWindowDimensions();

    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        getLocation();

        loadChapels();
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

    const loadChapels = async (city?: number) => {
        const responseData = await findChapels({
            latitude: -23.9675956,
            longitude: -46.3377967,
            city
        });

        const chapels = responseData.features.map(item => {
            const name = htmlparser2.DomUtils.textContent(htmlparser2.parseDocument(item.properties.name));

            const info = htmlparser2.DomUtils.textContent(htmlparser2.parseDocument(item.properties.fulladdress));

            const city = /icon-(?<city>[a-z-]+)\.png$/.exec(item.properties.icon)?.groups?.city ?? '';

            const chapel: Chapel = {
                name: name,

                info: info,

                distance: item.properties.distance,

                geometry: item.geometry,

                city: city,

                address: ''
            };

            return chapel;
        });

        setChapels(chapels);
    }

    const handleCityChange = (itemValue: number) => {
        setSelectedCity(itemValue);

        loadChapels(itemValue);
    };

    const handleMarkerPress = (index: number) => {
        scrollRef.current?.scrollTo({
            x: (index * (dimensions.width * 0.8)) + (index * 20),
            y: 0,
            animated: true
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.citySelectorContainer}>
                <Ionicons name="location" size={24} color="black" />
                <Picker
                    style={styles.citySelector}

                    selectedValue={selectedCity}
                    onValueChange={(itemValue: number) => handleCityChange(itemValue)}
                >
                    <Picker.Item label='Selecione uma cidade' value={undefined} />
                    {
                        cities.map(city => (
                            <Picker.Item key={city.key} label={city.value} value={city.key} />
                        ))
                    }
                </Picker>
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.9675956,
                    latitudeDelta: 0.04,
                    longitude: -46.3377967,
                    longitudeDelta: 0.04
                }}
            >
                <Marker
                    coordinate={{
                        latitude: -23.9675956,
                        longitude: -46.3377967
                    }}
                    title="Você"
                />
                {chapels.map((chapel, index) => (
                    <Marker
                        onPress={() => handleMarkerPress(index)}
                        key={index}
                        coordinate={{
                            latitude: chapel.geometry.coordinates[1],
                            longitude: chapel.geometry.coordinates[0]
                        }}
                        title={chapel.name}
                    >
                        <Image
                            source={markers[chapel.city]}
                            style={styles.markerIcon}
                        />
                    </Marker>
                ))}
            </MapView>

            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                style={styles.horizontalList}
                contentContainerStyle={{
                    paddingHorizontal: dimensions.width * 0.1 - 10
                }}
            >
                {chapels.map((chapel, index) => (
                    <ChapelPreview
                        key={index}
                        name={chapel.name}
                        info={chapel.info}
                        distance={chapel.distance}
                    />
                ))}
            </ScrollView>
        </View>
    );
}