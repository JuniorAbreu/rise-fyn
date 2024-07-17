import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, Pressable, Text, View } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from "../../hooks/useStorage";
import { Header } from "../../components/header";
import { ListItem } from "../../components/listItem";
import { AddButton } from "../../components/addButton";
import { TransactionModal } from "../../components/modal/transactionModal";
import Ionicons from '@expo/vector-icons/Ionicons';
import types from '../../mocks/transactionCategoryType'

export function Transactions() {
    const [transactionCategoryList, setTransactionCategoryList] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [projectedTransactionList, setProjectedTransactionList] = useState([]);
    const [accomplishedTransactionList,setAccomplishedTransactionList] = useState([]);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [isProject, setIsProjected] = useState(false);
    const isFocused = useIsFocused();
    const { getItem } = useStorage();

    async function loadTransactionCategories() {
        const transactionCategories = await getItem('@transaction_category').catch( error => console.error(error))
        setTransactionCategoryList(transactionCategories);
    }

    async function loadTransactions() {
        const transactions = await getItem('@transaction').catch( error => console.error(error));
        const today = new Date();
        const future = transactions?.filter(({date}) => {
            return new Date(date) > today;
        });

        const past = transactions?.filter(({date}) => {
            return new Date(date) <= today;
        });
        setProjectedTransactionList(future);
        setAccomplishedTransactionList(past);
        // setTransactionList(transactionCategories);
    }

    function getCategory(categoryId) {
        const transactions = transactionCategoryList.filter(({id}) => id === categoryId);
        return transactions[0];
    }

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

    function buildItem(item) {
        const category = getCategory(item.category);
        const type = types.filter(({id}) => category?.type === id)[0];
        const isExpense = type?.name?.toLocaleLowerCase() !== "receita";
        const value = isExpense ? `- ${item.value}` : `+ ${item.value}`;
        return (
            <View>
                <Text className="font-bold">{new Date(item.date)?.toLocaleDateString()}</Text>
                <View className='flex-row justify-between top-2'>
                    <View className= ''>
                        <Ionicons color='rgb(156, 163, 175)' size={24} name={getCategoryIcon(category?.name)}/>
                    </View>
                    <View className='left-3 content-between gap-1'>
                        <Text className="italic">{category?.name}</Text>
                        <Text className="font-bold">{item.description}</Text>
                        <Text className={!isExpense ? 'text-sky-600' : 'text-red-600'}>{value}</Text>
                    </View>
                </View>
                {/* <View className='left-28 absolute'>
                    <Ionicons color='rgb(156, 163, 175)' size={24} name="chevron-forward-outline"/>
                </View> */}
            </View>
        )
    }

    useEffect(() => {

        if (!showTransactionModal) {
            loadTransactions();
            loadTransactionCategories();
        } 
    }, [isFocused, showTransactionModal]);
    
    return (
       <SafeAreaView className='flex-1 h-full'>
            <Header title={'Extratos'}/>
            <View className="flex-row left-3 top-3 w-11/12 h-8 border-sky-950" borderBottomWidth={1}>
                <Pressable className={`left-1 ${!isProject && 'border-sky-600'}`} borderBottomWidth={!isProject ? 3 : 0} onPress={() => setIsProjected(false)}> 
                    <Text className={`${!isProject && 'font-bold'}`}>
                        Realizado
                    </Text>
                </Pressable>

                <Pressable className={`left-6 ${isProject && 'border-sky-600'}`} borderBottomWidth={isProject ? 3 : 0} onPress={() => setIsProjected(true)}> 
                    <Text className={`${isProject && 'font-bold'}`}>
                        Projetado
                    </Text>
                </Pressable>
            </View>
            <FlatList
            className='flex-1 pt-4 top-2'
            data={isProject ? projectedTransactionList : accomplishedTransactionList}
            renderItem={({item}) =>
                <Pressable className={`flex-row rounded w-full p-5 bg-white mb-2 `} onLongPress={() => {setSelectedTransaction(item); setShowTransactionModal(true)}}>
                    {buildItem(item)}
                </Pressable>
            }
            keyExtractor={(item) => item.id}
            />
            <AddButton onPress={() => { setShowTransactionModal(true) }}/>
            <Modal visible={showTransactionModal} animationType='fade' transparent={true}>
                <TransactionModal transaction={selectedTransaction} onClose={() => {setShowTransactionModal(false), setSelectedTransaction(null)}}/>
            </Modal>
        </SafeAreaView>
    )
}