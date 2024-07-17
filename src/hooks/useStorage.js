import AsyncStorage from "@react-native-async-storage/async-storage";


export const useStorage = () => {

    const getItem = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key);
            return JSON.parse(passwords) || []
        } catch (error) {
            console.error(error);
        }
    }

    const saveItem = async (key, value) => {
        try {
            const passwords = await getItem(key);
            passwords.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(passwords));
        } catch (error) {
            console.error(error);
        }
    }

    const editItem = async (key, value) => {
        try {
            const data = await getItem(key);
            const filteredData = data.filter(({id}) => id !== value.id);
            filteredData.push(value)
            await AsyncStorage.setItem(key, JSON.stringify(filteredData));
            return filteredData;
        } catch (error) {
            console.error(error);
        }
    }

    const removeItem = async (key, value) => {
        const passwords = await getItem(key);
        let myPass = passwords.filter( ({id}) => {
            return value !== id;
        });
        await AsyncStorage.setItem(key, JSON.stringify(myPass));
        return myPass;
    }

    return {
        getItem,
        saveItem,
        removeItem,
        editItem
    }
}
