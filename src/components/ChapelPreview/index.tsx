import React from 'react';
import { Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from "./styles";
import { RootStackParamList } from '../../navigation';

type ChapelPreviewProps = {
    name: string;
    info: string;
    distance: string;
}

export default function ChapelPreview(props: ChapelPreviewProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

    const dimensions = useWindowDimensions();

    const handleScheduleButtonPress = () => {
        navigation.navigate('NewSchedule', {
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
            }
        ]}>
            <Text>{props.name}</Text>
            <Text>{props.info}</Text>
            <Text>{props.distance}</Text>

            <TouchableOpacity style={styles.scheduleButton} onPress={() => handleScheduleButtonPress()}>
                <Ionicons name='calendar' color='#fff' size={16} />
                <Text style={styles.scheduleButtonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    );
}