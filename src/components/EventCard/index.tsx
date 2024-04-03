import { Share, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from "../../screens/Events/styles";
import { EventElement } from '../../screens/Events';

export default function EventCard ({event, index, addToCalendar}: {event: EventElement, index: number, addToCalendar: (title: string, date: Date, index: number) => Promise<void>}) {
    const { colors } = useTheme();

    const handleShareButtonPress = (title: string, date: string) => {
        Share.share({
            message: `Evento da Diocese de Santos\n${title} - ${date}`,
        })
    };

    const handleAddToCalendar = async () => {
        await addToCalendar(event.title, event.date, index)
    };
    
    return (
        <View
            style={[styles.card, {
                backgroundColor: colors.card,
                borderColor: colors.border
            }]}
        >
            <View style={{alignItems: "baseline"}}>
                <View style={[styles.cardTitleContainer]}>
                    <Text
                        style={[styles.cardTitleText, {
                            color: colors.text
                        }]}
                    >
                        {event.title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => handleShareButtonPress(event.title, event.date.toLocaleDateString())}
                    >
                        <Ionicons name="share-social" color={colors.text} size={20} />
                    </TouchableOpacity>
                </View>
                <Text
                    style={[{
                        color: colors.text
                    }]}
                >
                    {event.date.toLocaleDateString()} - {event.date.toLocaleDateString()}
                </Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                    disabled={event.isAdded}
                    onPress={() => handleAddToCalendar()}
                >
                    <Ionicons name={event.isAdded ? "checkmark-circle" : "calendar-outline"} color={event.isAdded ? "green" : colors.text} size={20} />
                    <Text style={{
                        marginLeft: 5,
                        color: event.isAdded ? "green" : colors.text,
                        fontSize: 16
                    }}>
                        {event.isAdded ? "Adicionado à agenda" : "Adicionar à agenda"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}