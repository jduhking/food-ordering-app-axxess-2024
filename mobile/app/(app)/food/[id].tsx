import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { screenHeight } from '@/utils/Dimensions';
import Food from '../../../models/Food';
import { useState, useEffect } from 'react';
import { foods } from '@/utils/FoodDummy';

export default function FoodDetails() {
    const { id } = useLocalSearchParams();
    const [food, setFood] = useState<Food>();

    useEffect(() => {
      // fetch the stuff
      setFood(foods.filter((food) => { return food._id === id })[0])
    }, [])
  return (
    <View style={styles.container}>
      <Text>{food?.name}</Text>
      <Text>{food?.category}</Text>
      <Text>{food?.restricted_diets}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.08,
    backgroundColor: 'white'
  },
})