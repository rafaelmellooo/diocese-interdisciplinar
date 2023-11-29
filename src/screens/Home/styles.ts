import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: '100%'
    },
    markerIcon: {
        width: 42,
        height: 60
    },
    horizontalList: {
        position: 'absolute',
        bottom: 10
    },
    citySelectorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
    },
    citySelector: {
        backgroundColor: '#ffffff',
        flex: 1
    }
});