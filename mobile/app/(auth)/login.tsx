import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { screenHeight } from '@/utils/Dimensions'
import { useAppStore } from '@/state/store'
import Patient from '@/models/Patient'


const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const setPatient = useAppStore((state) => state.setPatient);
    const router = useRouter();

    const handleLogin = () => {
        console.log('Logging in...');
        setLoading(true);
        setTimeout(() => {
          const patient: Patient = {
            _id: '3235r3',
            first_name: 'James',
            picture_link: 'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            last_name: 'Odebiyi',
            diet: ['REGULAR'],
            allergies: [],
            email: 'jamesbodebiyi@gmail.com',
            phone_number: '469-258-3232'
          }
          console.log('patient is ');
          console.log(patient)
          setPatient(patient);
          setLoading(false);
        }, 2000);
    }
  return (
    <View  style={styles.container}>
      <Text>You are on the Login Page</Text>
      {
        loading ? <ActivityIndicator /> : (
          <TouchableOpacity
          onPress={handleLogin}><Text>Login</Text></TouchableOpacity>
        )
      }
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.1,
    backgroundColor: 'white'
  },
})