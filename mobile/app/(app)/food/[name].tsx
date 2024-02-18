import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { screenHeight, screenWidth } from '@/utils/Dimensions';
import Food from '../../../models/Food';
import { useState, useEffect } from 'react';
import { foods } from '@/utils/FoodDummy';
import BackButton from '@/components/back-button';
import { useAppStore } from '@/state/store';
import axios from 'axios';
import { Plus, Subtract } from '@/icons/math';

export default function FoodDetails() {
    const { name } = useLocalSearchParams();
    const [food, setFood] = useState<Food | undefined>();
    const cart = useAppStore((state) => state.cart);
    const setCart = useAppStore((state) => state.setCart);
    
    useEffect(() => {
      console.log(cart)
    }, [cart])
    useEffect(() => {
      // fetch the stuff
      const server_url = process.env.EXPO_PUBLIC_BACKEND_URL;
      const fetchFood = async () => {
        const { data } = await axios.get(server_url + '/food/' + name);
        // console.log(data);
        setFood(data);
      }
      fetchFood();
    }, [])

    const handleAdd = () => {
      if(!food && cart) // make sure food is defined
        return;
      console.log('It passed this check')
      
      let newCart: Food[] = []

      if(cart.some((f: Food) => f._id === food?._id)){ // if food is already on cart then increment the quantity
        console.log(food?._id)
          const indexToUpdate = cart.findIndex(cartItem => cartItem._id === food?._id);
          console.log('index ', indexToUpdate)
          if (indexToUpdate !== -1) {
              // Increment the quantity of the food
              cart[indexToUpdate].quantity = (cart[indexToUpdate].quantity || 0) + 1;
              // Update the cart state
              setCart([...cart]);
              console.log('It passed this kill')
          }
          
      } else {
          // add the food to the cart

          food!['quantity'] = 1
          newCart = [...cart, food!]
          setCart(newCart);   
      }
  }
  const handleQuantity = () => {
    // Find the index of the food in the cart array
    const indexToUpdate = cart.findIndex(cartItem => cartItem._id === food?._id);

    // Check if the item exists in the cart and its quantity is greater than 0
    //@ts-ignore
    if (indexToUpdate !== -1 && cart[indexToUpdate].quantity > 0) {
        // Decrement the quantity of the item
        //@ts-ignore
        return cart[indexToUpdate].quantity;
    } {
      return 0
    }
  }
  const handleSubtract = () => {

      if(!food && cart) // make sure food is defined
          return;

      // Find the index of the food in the cart array
      const indexToUpdate = cart.findIndex(cartItem => cartItem._id === food?._id);

      // Check if the item exists in the cart and its quantity is greater than 0
      //@ts-ignore
      if (indexToUpdate !== -1 && cart[indexToUpdate].quantity > 0) {
          // Decrement the quantity of the item
          //@ts-ignore
          cart[indexToUpdate].quantity--;

          // If quantity becomes zero, remove the item from the cart
          if (cart[indexToUpdate].quantity === 0) {
              // Create a new cart array excluding the item to remove
              const updatedCart = cart.filter((_, index) => index !== indexToUpdate);
              // Update the cart state
              setCart(updatedCart);
          } else {
              // Update the cart state with the updated item
              setCart([...cart]);
          }
      }


  }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: '5%'}}>
        <BackButton />
      </View>
        <View style={{ flex: 0.6, marginBottom: '10%'}}>
          {
            food && ( <View style={styles.pictureContainer}>
              <Image 
              source={{uri: food?.picture_link}}
              style={styles.picture}/>
            </View>)
          }
        </View>
      <Text style={{ fontSize: 25, marginBottom: '5%', fontWeight: 'bold'}}>{food?.name}</Text>
      <View style={{ width: '100%', borderBottomWidth: 1, marginBottom: '5%'}}></View>
      <Text style={{ fontSize: 25, marginBottom: '5%', fontWeight: 'bold'}}>Description: </Text>
      <Text style={{ fontSize: 18, marginBottom: '5%'}}>{food?.description}</Text>
      <Text style={{ fontSize: 25, marginBottom: '2%', fontWeight: 'bold'}}>Calories: {food?.calories} kcals</Text>
      <Text style={{ fontSize: 25, marginBottom: '2%', fontWeight: 'bold'}}>Nutrition: </Text>
      <Text style={{ fontSize: 18, marginBottom: '2%', fontWeight: 'bold'}}>Carbs: {food?.carbs} </Text>
      <Text style={{ fontSize: 18, marginBottom: '2%', fontWeight: 'bold'}}>Protein: {food?.protein} </Text>
      <Text style={{ fontSize: 18, marginBottom: '5%', fontWeight: 'bold'}}>Fat: {food?.fat} </Text>
      <View style={{alignItems: 'center'}}>
        <View style={{ borderRadius: 15, borderWidth: 1, borderColor: '#a8a8a8', display: 'flex', paddingVertical: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: screenWidth * 0.25 }}>
            <TouchableOpacity
            onPress={handleSubtract}
        
            ><Subtract size={25}/></TouchableOpacity>
            <Text style={{fontSize: 32}} >{ handleQuantity() }</Text>
            <TouchableOpacity
            onPress={handleAdd}
            ><Plus size={25}/></TouchableOpacity>
        </View>
      </View>
      </View>
  )
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