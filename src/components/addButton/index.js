import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function AddButton({onPress}) {
  return (
    <TouchableOpacity
    className='bg-sky-600 border-sky-600 border-x rounded-full justify-center items-center absolute h-20 w-20 bottom-4 right-4'
    onPress={onPress} 
    > 
        <Ionicons color='white' size={32} name="add"/>
    </TouchableOpacity>
  )
}