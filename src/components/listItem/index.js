import React from 'react'
import { Text, Pressable } from 'react-native'

export function ListItem({text, onLongPress, innerClassName}) {
  return (
    <Pressable className={`flex-row rounded w-full p-4 bg-white mb-2 ${innerClassName}`} onLongPress={onLongPress}>
        <Text className='text-black'>{text}</Text>
    </Pressable>
  )
}