import React from 'react'
import { Text, View } from 'react-native'

export function Header({title}) {
  return (
    <View className='bg-sky-900 p-4 pt-14'>
        <Text className='text-lg text-white'> {title} </Text>
    </View>
  )
}