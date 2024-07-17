import { useEffect, useState } from "react"
import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native"
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from "../../hooks/useStorage";
import { PasswordItem } from "../../components/passwordItem";

const Password = () => {
    const [passwordList, setPasswordList] = useState([]);
    const isFocused = useIsFocused();
    const { getItem, removeItem } = useStorage();

    useEffect(()=> {
        async function loadPass() {
            const passwords = await getItem('@pass');
            setPasswordList(passwords);
        }
        loadPass();
    }, [isFocused])

    async function onRemove(item) {
        const list = await removeItem('@pass', item);
        setPasswordList(list);
    }
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
            <Text style={styles.title}>
                Minhas Senhas
            </Text>
        </View>
        
        <FlatList
        style={{flex: 1, paddingTop: 14, borderColor: 'black'}}
        data={passwordList}
        renderItem={({item}) => <PasswordItem password={item} onRemove={onRemove}/>}
        keyExtractor={(item) => item}
        />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#392DE9',
        paddingTop: 58,
        padding: 14
    },
     title: {
        fontSize: 18,
        color: "#FFF"
    },
    content: {

    }
  })

export default Password