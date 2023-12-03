import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image, ImageRequireSource, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import * as Location from 'expo-location';
import { useTheme } from '@react-navigation/native';
import * as cheerio from 'cheerio';

import { Chapel } from '../../interfaces/Chapel';
import ChapelPreview from '../../components/ChapelPreview';
import { findChapels } from '../../services/diocesedesantos.api';
import CustomPicker from '../../components/CustomPicker';
import { styles } from './styles';
import { darkMapStyle } from '../../themes/DarkTheme';
import { defaultMapStyle } from '../../themes/DefaultTheme';
import CustomCheckbox from '../../components/CustomCheckbox';
import Multiselect from '../../components/Multiselect';

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

export default function Home() {
    const { dark, colors } = useTheme();

    //const [location, setLocation] = useState<Location.LocationObject>();
    const [chapels, setChapels] = useState<Chapel[]>([]);

    const dimensions = useWindowDimensions();

    const scrollViewRef = useRef<ScrollView>(null);

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
            //city,
            city: 56
        });

        const chapels = responseData.features.map(item => {
            const $ = cheerio.load(item.properties.fulladdress);

            const city = /icon-(?<city>[a-z-]+)\.png$/.exec(item.properties.icon)?.groups?.city;

            const chapel: Chapel = {
                name: cheerio.load(item.properties.name).text(),

                info: $('b').first().text() + "\n" + "Olá",

                distance: item.properties.distance,

                geometry: item.geometry,

                city: city,

                address: $('b').last().text()
            };

            return chapel;
        });

        setChapels(chapels);
    }

    const handleMarkerPress = (index: number) => {
        scrollViewRef.current?.scrollTo({
            x: (index * (dimensions.width * 0.8)) + (index * 20),
            y: 0,
            animated: true
        });
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.background
        }]}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.9675956,
                    latitudeDelta: 0.04,
                    longitude: -46.3377967,
                    longitudeDelta: 0.04
                }}
                customMapStyle={dark ? darkMapStyle : defaultMapStyle}
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
                        {chapel.city && <Image
                            source={markers[chapel.city]}
                            style={styles.markerIcon}
                        />}
                    </Marker>
                ))}
            </MapView>

            <View style={{
                position: 'absolute',
                top: 0,
                width: dimensions.width
            }}>
                <CustomPicker
                    onChange={(cityId) => loadChapels(cityId)}
                />

                <Multiselect />
            </View>

            <ScrollView
                ref={scrollViewRef}
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
                        address={chapel.address}
                    />
                ))}
            </ScrollView>
        </View>
    );
}