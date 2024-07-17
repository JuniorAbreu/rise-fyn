import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

import * as Clipboard from 'expo-clipboard';
import { useStorage } from "../../hooks/useStorage";

export function PasswordModal({password, onClose}) {

    const { saveItem } = useStorage();

    async function onCopy() {
        await Clipboard.setStringAsync(password);
        await saveItem("@pass", password);
        alert("Senha salva")
        onClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.message}> Senha gerada </Text>
                <Pressable style={styles.innerPassword} onLongPress={onCopy}>
                    <Text style={styles.text}>
                        {password}
                    </Text>
                </Pressable>

                <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>
                        Voltar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={onCopy}>
                    <Text style={styles.buttonSaveText}>
                        Salvar
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24,0.6)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: 'black',
        marginBottom: 24,
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        backgroundColor: '#FFF',
        width: '85%',
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    innerPassword: {
        backgroundColor: 'black',
        width: '90%',
        padding: 14,
        borderRadius: 8
    },
    text: {
        textAlign: 'center',
        color: '#FFF'
    },
    buttonArea: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 14,
        padding: 8
    },
    buttonSave: {
        backgroundColor: '#392DE9',
        borderRadius: 8
    },
    buttonSaveText: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});