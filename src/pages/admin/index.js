import { SafeAreaView, View, Text } from "react-native";

export function Admin() {
    return (
       <SafeAreaView style={{flex: 1}}>
            <View className='bg-yellow-500 p-4 pt-14'>
                <Text className='text-lg text-white'> Minha conta </Text>
            </View>
        </SafeAreaView>
    )
}