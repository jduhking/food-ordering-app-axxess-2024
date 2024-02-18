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

export default function FoodDetails() {
    const { name } = useLocalSearchParams();
    const [food, setFood] = useState<Food | undefined>();
    const cart = useAppStore((state) => state.cart);
    const setCart = useAppStore((state) => state.setCart);
    
    useEffect(() => {
      // fetch the stuff
      const server_url = process.env.EXPO_PUBLIC_BACKEND_URL;
      const fetchFood = async () => {
        const { data } = await axios.get(server_url + '/food/' + name);
        console.log(data);
        setFood(data);
      }
      fetchFood();
    }, [])

    const handleAdd = () => {
      if(!food) // make sure food is defined
        return;

      let newCart: Food[] = [];
      
      const indexToUpdate = cart.findIndex(cartItem => cartItem._id === food._id);


         // Find the index of the item in the cart array
         
         //@ts-ignore
         if (indexToUpdate !== -1 && cart[indexToUpdate].quantity > 0) {
             // Decrement the quantity of the item
             //@ts-ignore
            cart[indexToUpdate].quantity = 0;
            const updatedCart = cart.filter((_, index) => index !== indexToUpdate);
            // Update the cart state
            setCart(updatedCart);
         } else {
          // add the item to the cart
          newCart = [...cart, food];
          food.quantity = 1;
          setCart(newCart);
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
      <Text style={{ fontSize: 22, marginBottom: '5%', fontWeight: 'bold'}}>Calories: </Text>
      <TouchableOpacity
      style={styles.buttonContainer}
      onPress={handleAdd}>
        <Text style={{ fontSize: 28, color: 'white'}}>
        {
          cart.some((cart) => cart._id === food?._id) ? "Remove From Order" 
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