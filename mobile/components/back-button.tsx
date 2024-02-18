import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { BackIcon } from '@/icons/back';

const BackButton = () => {
    const router = useRouter();
  return (
    <TouchableOpacity
    onPress={() => router.back()}
    >
      <BackIcon size={32} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({})