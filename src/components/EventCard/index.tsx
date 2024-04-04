import { Share, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from "../../screens/Events/styles";
import { EventElement } from '../../screens/Events';
import moment from 'moment';
import { Event } from '../../interfaces/Event';

export default function EventCard ({event, index, addToCalendar}: {event: EventElement, index: number, addToCalendar: (event: EventElement, index: number) => Promise<void>}) {
    const { colors } = useTheme();

    const handleShareButtonPress = (event: Event) => {
        Share.share({
            message: `Evento da Diocese de Santos\n${event.title} - ${moment(event.date).format("DD/MM/YY [às] HH:mm")}\n${event.address}`,
        })
    };

    const handleAddToCalendar = async () => {
        await addToCalendar(event, index)
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
                        onPress={() => handleShareButtonPress(event)}  
                    >
                        <Ionicons name="share-social" color={colors.text} size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={[{ color: colors.text }]}>{moment(event.date).format("DD/MM/YY [às] HH:mm")}</Text>
                <Text style={{ color: colors.text, marginTop: 5, ...(!event.address && {fontStyle: 'italic'}) }}>{event.address || "Endereço não informado"}</Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                    disabled={event.isAdded}
                    onPress={() => handleAddToCalendar()}
                >
                    <Ionicons name={event.isAdded ? "checkmark-circle" : "calendar-sharp"} color={event.isAdded ? "green" : colors.text} size={20} />
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