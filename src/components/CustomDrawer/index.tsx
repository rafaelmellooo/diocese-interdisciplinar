import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer';

type CustomDrawerProps = DrawerContentComponentProps;

export default function CustomDrawer(props: CustomDrawerProps) {
    const [isDark, setIsDark] = useState(false);

    const insets = useSafeAreaInsets();

    return (
        <View>
            <View style={{
                paddingTop: insets.top,
                backgroundColor: '#0D2744'
            }}>
                <Text style={{
                    color: '#F5F3F3',
                    fontWeight: 'bold',
                    fontSize: 20,
                    padding: 20
                }}>Diocese de Santos</Text>
            </View>

            <DrawerItemList {...props} />

            <View style={{
                borderTopColor: '#CCD5E0',
                borderTopWidth: 1,
                marginTop: 20,
                paddingTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20
            }}>
                <Text style={{
                    color: '#0D2744',
                    fontWeight: 'bold',
                    fontSize: 16
                }}>Modo Escuro</Text>

                <Switch
                    trackColor={{
                        true: '#0A1D33',
                        false: '#F5F3F3'
                    }}
                    thumbColor={isDark ? '#F5F3F3' : '#0D2744'}
                    onValueChange={() => setIsDark(!isDark)}
                    value={isDark}
                />
            </View>
        </View>
    );
}