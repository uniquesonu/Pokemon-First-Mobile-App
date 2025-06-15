import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#A1CEDC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(pokeman)/[id]"
        options={{
          title: 'Pokemon detailed',
          headerShown: true,
        }}
      />
    </Stack>
  )
}

export default Layout