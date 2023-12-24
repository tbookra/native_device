import { Pressable, StyleSheet, Text } from "react-native"
import {Ionicons} from '@expo/vector-icons'
import { Colors } from "../constants/colors"

const OutlinedButton = ({icon,children,onPress}) => {
    return <Pressable style={({pressed})=>[styles.button, pressed && styles.pressed ]}>
        <Ionicons style={styles.icon} color={Colors.primary500} name={icon} size={18} onPress={onPress} />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal:12,
        paddingVertical:6,
        margin:4,
        flexDirection:"row-reverse",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:Colors.primary500,
    },
    pressed: {
        opacity:0.7
    },
    icon:{
        marginLeft:6,
    },
    text:{
        color: Colors.primary500
    }
})