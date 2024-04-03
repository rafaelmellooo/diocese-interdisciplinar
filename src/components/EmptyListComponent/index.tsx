import { Text, View } from "react-native";
import { styles } from "./styles";

const EmptyListComponent = ({text}: {text: string}) => (
    <View style={[styles.container, {
        alignItems: 'center',
        borderWidth: 0
    }]}>
        <Text style={{ fontSize: 16, color: "#808080" }}>{text}</Text>
    </View>
)

export default EmptyListComponent;