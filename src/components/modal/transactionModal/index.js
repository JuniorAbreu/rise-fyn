import { View, Text, SafeAreaView, TextInput, Pressable, Platform, TouchableOpacity } from "react-native";
import { useStorage } from "../../../hooks/useStorage";
import { useState, useEffect } from "react";
import { ModalBottom } from "../modalBottom/modalBottom";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'
import types from '../../../mocks/transactionCategoryType';

export function TransactionModal({onClose, transaction}) {

    const { saveItem, editItem, removeItem, getItem } = useStorage();
    const [transactionCategoryList, setTransactionCategoryList] = useState([]);
    const [description, setDescription] = useState(transaction?.description || '');
    const [observation, setObservation] = useState(transaction?.observation || '');
    const [category, setCategory] = useState(transaction?.category || null);
    const [value, setValue] = useState(transaction?.value || 0);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(transaction?.date ? new Date(transaction?.date) : new Date());
    const onSubmit = async () => {
        const data ={
            description,
            value,
            observation,
            category,
            active: true,
            date,
            lastUpdateDate: new Date(),
            lastUpdateOwner: '',
        }

        if (transaction?.id) {
            data.id = transaction.id;
            await editItem('@transaction', data);
        } else {
            data.id = Math.floor(Math.random() * (1000 - 1) + 1);
            await saveItem('@transaction', data);
        }
        alert('Transação salva');
        onClose();
    };

    const onDelete = async () => {
        await removeItem('@transaction', transaction?.id);
        alert("Transação Deletada")
        onClose();
    }

    const changeDate = ({type}, selectedDate) => {

        if (type === "set") {
            setDate(selectedDate);
            if (Platform.OS === "android") {
                setShowDatePicker(prevState => !prevState);
            }
        } else {
            setShowDatePicker(prevState => !prevState);
        }
    }

    function getTypeName(categoryId) {
        const type = types.filter(({id}) => categoryId=== id)[0];
        return type?.name;
    }

    function getDefault(categoryId) {

        const category = transactionCategoryList.filter(({key}) => categoryId === key)[0];
        const data = {key: category?.key, value: category?.value};
        return data;
    }

    useEffect(() => {
        async function loadTransactionCategories() {
            const transactionCategories = await getItem('@transaction_category').catch( error => console.error(error));
            const data = transactionCategories.map(({id, name, type}) => {
                const value = `${getTypeName(type)} - ${name}`;
                return {key: id, value};
            });
            setTransactionCategoryList(data);
        }
        loadTransactionCategories();
    }, [])

    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-gray-600/50'>
            <View className='w-5/6 pt-6 pb-6 items-center justify-center rounded-lg bg-slate-50'>
                <Text className='text-black mb-6 text-lg font-bold'> {!transaction ? 'Nova transação' : 'Editar transação'} </Text>
                <View className='flex-col w-11/12 items-center content-between gap-3'>
                    <DateTimePicker
                        mode="date"
                        value={date}
                        placeholderText="Data da transação"
                        onChange={changeDate}
                        date={date ? new Date(date) : new Date()}
                    />
                    <TextInput
                        className='border-gray-400 h-10 border w-11/12 rounded-lg p-2'
                        placeholder="Descrição"
                        onChangeText={(e) => setDescription(e)}
                        value={description}
                    />
                    <TextInput
                        className='border-gray-400 h-10 border w-11/12 rounded-lg p-2'
                        placeholder="Valor"
                        onChangeText={(e) => e ? setValue(parseFloat(e)) : setValue(e)}
                        value={value?.toString()}
                    />
                    <View className='w-11/12'>
                        <SelectList
                            defaultOption={getDefault(category)}
                            boxStyles={{borderRadius: '8', width: '100%', borderColor: 'rgb(156, 163, 175)'}}
                            setSelected={setCategory}
                            placeholder="Categoria"
                            data={transactionCategoryList}  
                            search={false} 
                        />
                    </View>
                    <TextInput
                        className='border-gray-400 h-16 border w-11/12 rounded-lg p-2'
                        placeholder="Observações"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(e) => setObservation(e)}
                        value={observation}
                    />
                </View>
                <ModalBottom isEditMode={transaction?.id} onCancel={onClose} onSubmit={onSubmit} onDelete={onDelete}/>

            </View>
        </SafeAreaView>
    )
}