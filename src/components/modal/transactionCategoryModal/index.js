import { View, Text, SafeAreaView, TextInput, Switch } from "react-native";
import { useStorage} from "../../../hooks/useStorage";
import { useState } from "react";
import { ModalBottom } from "../modalBottom/modalBottom";
import types from '../../../mocks/transactionCategoryType'
import { SelectList } from 'react-native-dropdown-select-list'

export function TransactionCategoryModal({onClose, transactionCategory}) {

    const { saveItem, editItem, removeItem } = useStorage();
    const [name, setName] = useState(transactionCategory?.name || '');
    const [type, setType] = useState(transactionCategory?.type);
    const onSubmit = async () => {
        const data ={
            name,
            active: true,
            lastUpdateDate: new Date(),
            lastUpdateOwner: '',
            type
        }

        if (transactionCategory?.id) {
            data.id = transactionCategory.id;
            await editItem('@transaction_category', data);
        } else {
            data.id = Math.floor(Math.random() * (1000 - 1) + 1);
            await saveItem('@transaction_category', data);
        }
        alert('Categoria salva');
        onClose();
    };

    const onDelete = async () => {
        await removeItem('@transaction_category', transactionCategory?.id);
        alert("Categoria Deletada")
        onClose();
    }

    function getDefault(typeId) {
        const type = types.filter(({id}) => typeId === id)[0];
        const data = {key: type?.id, value: type?.name};
        return data;
    }

    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-gray-600/50'>
            <View className='w-5/6 pt-6 pb-6 items-center justify-center rounded-lg bg-slate-50'>
                <Text className='text-black mb-6 text-lg font-bold'> {!transactionCategory ? 'Nova categoria' : 'Editar categoria'} </Text>
                <View className='flex-col w-11/12 mt-2 items-center justify-between'>
                    <TextInput
                        className='border-gray-400 h-10 border w-11/12 rounded-lg mb-3 p-2'
                        placeholder="Nome da Categoria"
                        onChangeText={(e) => setName(e)}
                        value={name}
                    />
                    <View className='w-11/12'>
                        <SelectList
                            defaultOption={getDefault(type)}
                            boxStyles={{borderRadius: '8', width: '100%', borderColor: 'rgb(156, 163, 175)'}}
                            setSelected={setType}
                            placeholder="Categoria"
                            data={types.map(({id, name}) => {
                                return {key: id, value: name}
                            })}  
                            search={false} 
                        />
                    </View>
                </View>

                <ModalBottom isEditMode={transactionCategory?.id} onCancel={onClose} onSubmit={onSubmit} onDelete={onDelete}/>
            </View>
        </SafeAreaView>
    )
}