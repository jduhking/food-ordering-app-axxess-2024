import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const BackButton = () => {
    const router = useRouter();
  return (
    <TouchableOpacity
    onPress={() => router.back()}>
      <Text>Back</Text>
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({})