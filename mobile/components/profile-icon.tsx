import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Patient from '@/models/Patient'

const ProfileIcon = ({ patient } : { patient: Patient}) => {
  return (
    <Link
    asChild //@ts-ignore
    href={'/patient/' + patient.first_name}>
      <TouchableOpacity style={styles.profileContainer}>
        <Image source={{ uri: patient.picture_link}} style={styles.picture}/>
      </TouchableOpacity>
    </Link>
  )
}

export default ProfileIcon

const styles = StyleSheet.create({
    profileContainer: {
        width: 48,
        height: 48,
        borderRadius: 200,
        overflow: 'hidden'
    },
    picture: {
        resizeMode: "cover",
        width: "100%",
        height: "100%",
      },
})