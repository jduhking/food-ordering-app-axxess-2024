import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import BackButton from '@/components/back-button'
import { useAppStore } from '@/state/store'
import { screenHeight, screenWidth } from '@/utils/Dimensions'

export default function PatientScreen (){

    const { name } = useLocalSearchParams();

    const patient = useAppStore((state) => state.patient);
    return (
    <View style={styles.container}>
        <View style={{ marginBottom: '5%'}}>
        <BackButton />
        </View>
        <Text style={{ fontSize: 32, fontWeight: '700', marginBottom: '5%'}}>Profile</Text>
        <View style={{ flex: 0.6, marginBottom: '5%'}}>
            {
            patient && ( <View style={styles.pictureContainer}>
                <Image
                source={{uri: patient.picture_link!}}
                style={styles.picture}/>
            </View>)
            }
        </View>
        <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 22, marginBottom: '2%', fontWeight: 'bold', marginRight: '5%'}}>First Name:</Text>
            <Text style={{  fontSize: 20, fontWeight: 'bold' }}>{patient?.first_name}</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 22, marginBottom: '2%', fontWeight: 'bold', marginRight: '5%'}}>Last Name:</Text>
            <Text style={{  fontSize: 20, fontWeight: 'bold' }}>{patient?.last_name}</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 20, marginBottom: '2%', fontWeight: 'bold', marginRight: '5%'}}>Email:</Text>
            <Text style={{  fontSize: 18 }}>{patient?.email}</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 20, marginBottom: '5%', fontWeight: 'bold', marginRight: '5%'}}>Phone #:</Text>
            <Text style={{  fontSize: 18 }}>{patient?.phone_number}</Text>
        </View>
        <Text style={{ fontSize: 25, marginBottom: '5%', fontWeight: 'bold'}}>Dietary Information</Text>
        <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 20, marginBottom: '5%', fontWeight: 'bold', marginRight: '5%'}}>Diet (s):</Text>
            <Text style={{  fontSize: 18, fontWeight: 'bold'}}>{patient?.diet.map((i) => { return `${i}, `})}</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 20, marginBottom: '5%', fontWeight: 'bold', marginRight: '5%'}}>Allergies :</Text>
            <Text style={{  fontSize: 18, fontWeight: 'bold'}}>{patient && patient?.allergies.length > 0 ? patient?.allergies.map((i) => { return `${i}, `}) : 'NONE'}</Text>
        </View>
    </View>)
     
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: screenHeight * 0.08,
  backgroundColor: 'white',
  paddingHorizontal: '5%'
  
},

buttonContainer: {
  backgroundColor: '#780000',
  width: '100%',
  height: screenWidth * 0.13,
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center'
},
pictureContainer: {
  width: '100%',
  height: '100%',
  borderRadius: 25,
  overflow: 'hidden',
  
},
picture: {
  resizeMode: "cover",
  width: "100%",
  height: "100%",
},

})