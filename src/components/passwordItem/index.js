import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native';


export function PasswordItem({password, onRemove}) {
  return (
    <View>
        <Pressable  onLongPress={() => onRemove(password)} style={styles.container}>
            <Text className='text-red-800'>
                {password}
            </Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 14,
        width: '100%',
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white'
    }
})