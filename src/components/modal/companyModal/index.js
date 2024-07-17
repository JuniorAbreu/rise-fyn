import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStorage} from "../../../hooks/useStorage";
import { useState } from "react";

export function CompanyModal({onClose, company}) {

    const { saveItem, editItem, removeItem } = useStorage();
    const [name, setName] = useState(company?.name || '');
    const [balance, setBalance] = useState(company?.balance || 0);
    const [analisysDate, setAnalisysDate] = useState(company?.analisysDate || new Date());

    const onSubmit = async () => {
        const data ={
            name,
            balance,
            active: true,
            lastUpdateDate: new Date(),
            lastUpdateOwner: '',
            startDate: company?.startDate || new Date(),
            analisysDate
        }

        if (company?.id) {
            data.id = company.id;
            await editItem(data);
        } else {
            data.id = Math.floor(Math.random() * 100);
            await saveItem('@company', data);
        }
        alert('Empresa salva');
        onClose();
    };

    const onDelete = async () => {
        await removeItem('@company', company?.id);
        alert("Empresa Deletada")
        onClose();
    }

    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-gray-600/50'>
            <View className='w-5/6 pt-6 pb-6 items-center justify-center rounded-lg bg-slate-50'>
                <Text className='text-black mb-6 text-lg font-bold'> {!company ? 'Nova empresa' : 'Editar empresa'} </Text>
                <View className='flex-col w-11/12 mt-2 items-center justify-between'>
                    <TextInput
                        className='border-gray-400 h-10 border w-11/12 rounded-lg mb-3 p-2'
                        placeholder="Nome da empresa"
                        onChangeText={(e) => setName(e)}
                        value={name}
                    />
                    <TextInput
                        className='border-gray-400 h-10 border w-11/12 rounded-lg mb-3 p-2'
                        placeholder="Saldo atual"
                        keyboardType="numeric"
                        label='Saldo'
                        onChangeText={(e) => setBalance(e)}
                        value={balance}
                    />
                    <DateTimePicker 
                        value={new Date()}
                        placeholderText="Data da análise"
                        onChange={(e) => setAnalisysDate(e)}
                        date={analisysDate ? new Date(analisysDate) : new Date()}
                    />
                </View>

                <View className='space-x-3 flex-row w-11/12 mt-2 items-center justify-center'>
                    {company?.id ?
                    <TouchableOpacity className='bg-red-600 flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={onDelete}>
                        <Text className='text-white font-bold'>
                            Deletar
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity className='flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={onClose}>
                        <Text className='font-bold'>
                            Voltar
                        </Text>
                    </TouchableOpacity>
                    }

                    <TouchableOpacity className='bg-sky-600 flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={onSubmit}>
                        <Text className='text-white font-bold'>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}