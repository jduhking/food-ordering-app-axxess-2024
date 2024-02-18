import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { screenHeight, screenWidth } from '@/utils/Dimensions'
import { useAppStore } from '@/state/store'
import Patient from '@/models/Patient'
import { Diets } from '@/models/Diets'
import { StatusBar } from 'expo-status-bar'


const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const setPatient = useAppStore((state) => state.setPatient);
    const router = useRouter();
    const handleLogin = () => {
        console.log('Logging in...');
        setLoading(true);
        setTimeout(() => {
          const patient: Patient = {
            _id: '65d1b72a09f2c26dde830b6e',
            first_name: 'James',
            picture_link: 'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            last_name: 'Odebiyi',
            diet: [Diets.REGULAR],
            allergies: [],
            email: 'jamesbodebiyi@gmail.com',
            phone_number: '469-258-3232'
          }
          console.log('patient is ');
          console.log(patient)
          setPatient(patient);
          setLoading(false);
        }, 500);
    }
  return (
    <View  style={styles.container}>
      <StatusBar backgroundColor='dark'/>
      <Text style={{ fontSize: 48, fontFamily: 'SpaceMono',
    textAlign: 'center', marginBottom: '10%'}}>MealMed</Text>
      <Text style={{ fontSize: 22, fontFamily: 'SpaceMono',
    textAlign: 'center', fontWeight: '600', marginBottom: '10%', }}>Order food, and track your nutrition all in one app</Text>
    
    <Image source={require('../../assets/images/art.png')} 
    style={{
      width: 335.8,
      height: 328,
      marginBottom: '10%'
    }}/>
      
      <View style={{ width: screenWidth * 0.8}}>
      {
        loading ? (
        <View style={{ backgroundColor: '#780000', borderRadius: 60, justifyContent: 'center', alignItems: 'center',
        height: screenHeight * 0.06}}><ActivityIndicator color="white" />
        </View>) : (
          <TouchableOpacity
          style={{ backgroundColor: '#780000', borderRadius: 60, justifyContent: 'center', alignItems: 'center',
        height: screenHeight * 0.06}}
          onPress={handleLogin}><Text
          style={{ fontSize: 32, fontFamily: 'SpaceMono', color: 'white'}}>Login</Text></TouchableOpacity>
        )
      }
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.1,
    backgroundColor: '#fdf0d5',
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
})