import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ActivityIndicator, FlatList, Image, ImageRequireSource, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import * as Location from 'expo-location';
import { useTheme } from '@react-navigation/native';
import * as cheerio from 'cheerio';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

import { Chapel } from '../../interfaces/Chapel';
import ChapelPreview from '../../components/ChapelPreview';
import { findChapels } from '../../services/diocesedesantos.api';
import CustomPicker from '../../components/CustomPicker';
import { styles } from './styles';
import { styles as chapelStyles } from '../../components/ChapelPreview/styles'
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
    const [selectedCity, setSelectedCity] = useState<number>(59);
    const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);

    const dimensions = useWindowDimensions();

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        loadChapels();
    }, [selectedCity, selectedSchedules]);

    useEffect(() => {
        setOpacity(isLoading ? 0.5 : 1);
    }, [isLoading])

    const loadChapels = async () => {
        setIsLoading(true);
        
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
        setIsLoading(false);
        setIsCollapsed(false);
    }

    const handleMarkerPress = (index: number) => {
        flatListRef.current?.scrollToIndex({
            index: index,
            animated: true,
            viewPosition: 0.5
        });
        setIsCollapsed(false);
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.background,
        }]}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={[styles.map, {
                    opacity: opacity
                }]}
                initialRegion={{
                    latitude: location.coords.latitude,
                    latitudeDelta: 0.04,
                    longitude: location.coords.longitude,
                    longitudeDelta: 0.04
                }}
                customMapStyle={dark ? darkMapStyle : defaultMapStyle}
                onPress={() => setIsCollapsed(true)}
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

            <ActivityIndicator
                style={{
                    position: 'absolute',
                    left: dimensions.width * 0.5 - 20,
                    bottom: dimensions.height * 0.5,
                }}
                size="large"
                color={colors.primary}
                animating={isLoading}
            />
            
            <CollapsibleView
                title={
                    <Text
                        style={{
                            fontSize: 16,
                            padding: 10,
                            color: colors.primary,
                            textDecorationLine: 'underline'
                        }}
                        onPress={() => setIsCollapsed(!isCollapsed)} 
                    >
                        {isCollapsed ? "Mostrar" : "Ocultar"} cards
                    </Text>
                }
                expanded={!isCollapsed}
                noArrow
                activeOpacityFeedback={1}
                style={[styles.horizontalList, {
                    borderWidth: 0,
                    opacity: opacity
                }]}
            >
                <FlatList
                    ref={flatListRef}
                    data={chapels}
                    renderItem={({item, index}) => <ChapelPreview
                        key={index}
                        name={item.name}
                        info={item.info}
                        distance={item.distance}
                        address={item.address}
                        contact={item.contact}
                    />}
                    horizontal
                    contentContainerStyle={{
                        paddingHorizontal: dimensions.width * 0.1 - 40
                    }}
                    getItemLayout={(_, index) => (
                        {
                            length: (dimensions.width * 0.8) + (chapelStyles.card.marginHorizontal * 2),
                            offset: ((dimensions.width * 0.8) + (chapelStyles.card.marginHorizontal * 2)) * index,
                            index
                        }
                    )}
                />
            </CollapsibleView>
        </View>
    );
}