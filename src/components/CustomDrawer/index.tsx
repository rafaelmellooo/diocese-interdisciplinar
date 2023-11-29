import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer';
import { styles } from './styles';

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
                <Text style={styles.headerText}>Diocese de Santos</Text>
            </View>

            <DrawerItemList {...props} />

            <View style={styles.darkModeContainer}>
                <Text style={styles.darkModeText}>Modo Escuro</Text>

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