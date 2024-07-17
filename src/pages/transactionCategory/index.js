import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, View, Text, Pressable } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from "../../hooks/useStorage";
import { Header } from "../../components/header";
import { ListItem } from "../../components/listItem";
import { AddButton } from "../../components/addButton";
import { TransactionCategoryModal } from "../../components/modal/transactionCategoryModal";
import types from '../../mocks/transactionCategoryType'
import Ionicons from '@expo/vector-icons/Ionicons';

export function TransacationCategory() {
    const [transactionCategoryList, setTransactionCategoryList] = useState([]);
    const [selectedtransactionCategory, setSelectedTransaction] = useState(null)
    const [showTransactionCategoryModal, setshowTransactionCategoryModal] = useState(false);
    const isFocused = useIsFocused();
    const { getItem } = useStorage();

    useEffect(() => {
        async function loadTransactionCategories() {
            const transactionCategories = await getItem('@transaction_category').catch( error => console.error(error))
            setTransactionCategoryList(transactionCategories);
        }
        if (!showTransactionCategoryModal) {
            loadTransactionCategories();
        }
    }, [isFocused, showTransactionCategoryModal]);

    function getCategoryIcon(categoryName) {
        const name = categoryName?.toLowerCase()?.replaceAll(/\s/g,'');
        switch (name) {
            case 'serviçosprestados':
                return 'construct-outline';
            case 'administrativo':
                return 'business-outline';
            case 'pessoas':
                return 'people';
            case 'produtos':
                return 'cube';
            case 'produtos':
                return 'cube';
            case 'comercial':
                return 'briefcase';
            case 'desenvolvimentodesoftware':
                return 'desktop';
            default:
                return 'help';
        }
    }
    function buildItem(category) {
        const type = types.filter(({id}) => category?.type === id)[0];
        return (
            <View>
                <View className='flex-row justify-between top-2'>
                    <View className= ''>
                        <Ionicons color='rgb(156, 163, 175)' size={24} name={getCategoryIcon(category?.name)}/>
                    </View>
                    <View className='left-3 content-between gap-1'>
                        <Text className="italic">{category?.name}</Text>
                        <Text className="font-bold">{type?.name}</Text>
                    </View>
                </View>
                {/* <View className='left-28 absolute'>
                    <Ionicons color='rgb(156, 163, 175)' size={24} name="chevron-forward-outline"/>
                </View> */}
            </View>
        )
    }
    
    return (
       <SafeAreaView className='flex-1 h-full'>
            <Header title={'Categorias de transação'}/>
            <FlatList
            className='flex-1 pt-4 top-2'
            data={transactionCategoryList}
            renderItem={({item}) =>
                <Pressable className={`flex-row rounded w-full p-5 bg-white mb-2 `} onLongPress={() => {setSelectedTransaction(item); setshowTransactionCategoryModal(true)}}>
                    {buildItem(item)}
                </Pressable>
            }
            keyExtractor={(item) => item.id}
            />
            <AddButton onPress={() => { setshowTransactionCategoryModal(true) }}/>
            <Modal visible={showTransactionCategoryModal} animationType='fade' transparent={true}>
                <TransactionCategoryModal transactionCategory={selectedtransactionCategory} onClose={() => {setshowTransactionCategoryModal(false), setSelectedTransaction(null)}}/>
            </Modal>
        </SafeAreaView>
    )
}