import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        height: 220,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    scheduleButton: {
        backgroundColor: '#1386F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    scheduleButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 6
    }
});