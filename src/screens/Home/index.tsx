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
import Multiselect from '../../components/Multiselect';
import { useLocation } from '../../contexts/LocationContext';

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

    const { location } = useLocation();
    const [chapels, setChapels] = useState<Chapel[]>([]);
    const [selectedCity, setSelectedCity] = useState<number>();
    const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);

    const dimensions = useWindowDimensions();

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        loadChapels();
    }, [selectedCity, selectedSchedules]);

    const loadChapels = async () => {
        const responseData = await findChapels({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            city: selectedCity,
            schedules: selectedSchedules
        });

        const chapels = responseData.features.map(item => {
            const city = /icon-(?<city>[a-z-]+)\.png$/.exec(item.properties.icon)?.groups?.city;

            let contentData: RegExpExecArray | null = null;
            try {
                contentData = /(?<!(?:.|\s)+)(?<infoTitle>^[^:]+):\s+[MATRIZ:\s+]*(?<infoText>(?:.|\s)+)\s+(?:Endereço):\s+(?<address>(?:.|\s)+SP)\s+(?<contact>\(\d{2}\)\s*[\d-]+)*/gmi.exec(
                    cheerio.load(
                        cheerio.load(item.properties.fulladdress).html().replace(/<br>/gm, '\n')
                    ).text().replace(/AVISO IMPORTANTE.+/, '')
                );
            } catch (error) {

            }

            const chapel: Chapel = {
                name: cheerio.load(item.properties.name).text(),

                info: {
                    title: contentData?.groups?.infoTitle,
                    text: contentData?.groups?.infoText,
                },

                distance: item.properties.distance,

                geometry: item.geometry,

                city: city,

                address: contentData?.groups?.address,

                contact: contentData?.groups?.contact
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
                    latitude: location.coords.latitude,
                    latitudeDelta: 0.04,
                    longitude: location.coords.longitude,
                    longitudeDelta: 0.04
                }}
                customMapStyle={dark ? darkMapStyle : defaultMapStyle}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
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
                    selectedValue={selectedCity}
                    onChange={cityId => setSelectedCity(cityId)}
                />

                <Multiselect
                    selectedValues={selectedSchedules}
                    onChange={schedules => setSelectedSchedules(schedules)}
                />
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
                        contact={chapel.contact}
                    />
                ))}
            </ScrollView>
        </View>
    );
}