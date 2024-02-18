import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { screenHeight } from '@/utils/Dimensions';
import Food from '../../../models/Food';
import { useState, useEffect } from 'react';
import { foods } from '@/utils/FoodDummy';
import BackButton from '@/components/back-button';
import { useAppStore } from '@/state/store';

export default function FoodDetails() {
    const { id } = useLocalSearchParams();
    const [food, setFood] = useState<Food | undefined>();
    const cart = useAppStore((state) => state.cart);
    const setCart = useAppStore((state) => state.setCart);
    
    useEffect(() => {
      // fetch the stuff
      setFood(foods.filter((food) => { return food._id === id })[0])
    }, [])

    const handleAdd = () => {
      if(!food) // make sure food is defined
        return;

      let newCart: Food[] = [];
      if(cart.some((item: Food) => item._id === id)){ // if item is already on cart then remove it
        newCart = cart.filter((cart) => { return cart._id !== id});
      } else {
        // add the item to the cart
        newCart = [...cart, food]
      }
      setCart(newCart);
    }
  return (
    <View style={styles.container}>
      <BackButton />
      <Text>{food?.name}</Text>
      <Text>{food?.category}</Text>
      <Text>{food?.restricted_diets}</Text>
      <TouchableOpacity
      onPress={handleAdd}>
        <Text>
        {
          cart.some((cart) => cart._id === id) ? "Remove From Order" 
          : "Add To Order"
        }
        </Text>
      </TouchableOpacity>
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