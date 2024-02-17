import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'


const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const handleLogin = () => {
        console.log('Logging in...')
        setLoading(true);
        setTimeout(() => {
            router.push('/home/')
            setLoading(false);
        }, 2000);
    }
  return (
    <View>
      <Text>You are on the Login Page</Text>
      <TouchableOpacity
      onPress={handleLogin}>Login</TouchableOpacity>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({})