import React from 'react';
import { Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from "./styles";
import { RootStackParamList } from '../../navigation';

type ChapelPreviewProps = {
    name: string;
    info: string;
    distance: string;
    address: string;
}

export default function ChapelPreview(props: ChapelPreviewProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

    const { dark, colors } = useTheme();

    const dimensions = useWindowDimensions();

    const handleReminderButtonPress = () => {
        navigation.navigate('NewReminder', {
            name: props.name,
            info: props.info,
            distance: props.distance
        });
    }

    return (
        <View style={[
            styles.card,
            {
                width: dimensions.width * 0.8,
                backgroundColor: colors.card
            }
        ]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
            }}>
                <View>
                    <Text style={[styles.title, {
                        color: dark ? '#1386F2' : '#0D2744'
                    }]}>
                        {props.name}
                    </Text>

                    <Text style={[{
                        color: colors.text
                    }]}>
                        {props.info}
                    </Text>

                    <Text style={[{
                        color: colors.text
                    }]}>
                        {props.address}
                    </Text>
                </View>

                <Text style={[styles.distance, {
                    borderColor: colors.border,
                }]}>
                    {props.distance}
                </Text>
            </View>

            <TouchableOpacity style={[styles.scheduleButton, {
                backgroundColor: colors.primary
            }]} onPress={() => handleReminderButtonPress()}>
                <Ionicons name='notifications' color={dark ? '#0A1D33' : '#F5F3F3'} size={16} />

                <Text
                    style={[styles.scheduleButtonText, {
                        color: dark ? '#0A1D33' : '#F5F3F3'
                    }]}
                >
                    Criar Lembrete
                </Text>
            </TouchableOpacity>
        </View>
    );
}