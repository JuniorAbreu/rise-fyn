import { Text, TouchableOpacity, View } from "react-native";

export function ModalBottom ({onCancel, onDelete, onSubmit, isEditMode}) {
    return (
        <View className='space-x-3 flex-row w-11/12 mt-2 items-center justify-center top-6'>
            {isEditMode ?
            <TouchableOpacity className='bg-red-600 flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={onDelete}>
                <Text className='text-white font-bold'>
                    Deletar
                </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity className='flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={onCancel}>
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
    )
}