import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { screenHeight } from '@/utils/Dimensions'
import BackButton from '@/components/back-button'
import { useAppStore } from '@/state/store'
import Food from '@/models/Food'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import FoodOrder from '@/models/FoodOrder'
import { Meal } from '@/models/Meal'
import { Status } from '@/models/Status'
import { useRouter } from 'expo-router'

const ShoppingCart = () => {
    const { bottom } = useSafeAreaInsets();
    const cart: Food[] = useAppStore((state) => state.cart);
    const setCart = useAppStore((state) => state.setCart);
    const patient = useAppStore((state) => state.patient);
    const router = useRouter();
    
    const renderItem = ({ item } : ListRenderItemInfo<Food>) => {
        const handleAdd = () => {
            if(!item && cart) // make sure food is defined
                return;
            
            let newCart: Food[] = []

            if(cart.some((food: Food) => food._id === item._id)){ // if item is already on cart then increment the quantity
                const indexToUpdate = cart.findIndex(cartItem => cartItem._id === item._id);
                if (indexToUpdate !== -1) {
                    // Increment the quantity of the item
                    cart[indexToUpdate].quantity = (cart[indexToUpdate].quantity || 0) + 1;
                    // Update the cart state
                    setCart([...cart]);
                }
            } else {
                // add the item to the cart
                newCart = [...cart, item]
                setCart(newCart);   
            }
        }
        const handleSubtract = () => {

            if(!item && cart) // make sure food is defined
                return;

            // Find the index of the item in the cart array
            const indexToUpdate = cart.findIndex(cartItem => cartItem._id === item._id);

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
            <View
            style={{
                height: screenHeight * 0.1,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <Text style={{fontSize: 20}}>{item.name}</Text>
                <Text style={{fontSize: 32}} >{item.quantity ? item.quantity : 1}</Text>
                <TouchableOpacity
                onPress={handleAdd}
           
                ><Text style={{fontSize: 32}}>+</Text></TouchableOpacity>
                <TouchableOpacity
                onPress={handleSubtract}
                ><Text style={{fontSize: 32}}>-</Text></TouchableOpacity>
            </View>
        )
    }

    const handleSubmit = async () =>{
        console.log('Submitting shopping cart with items: ');
        const server_url = process.env.EXPO_PUBLIC_BACKEND_URL;
        console.log(`This is the server ${server_url}`)
        // console.log(cart) 
        console.log(patient)
        const food_order: FoodOrder = {
            food: cart,
            meal: Meal.BREAKFAST,
            recipient: patient!,
            delivered: false,
            status: Status.PROCESSING,
        }
        console.log(food_order)
        try {
            const { data } = await axios.post(server_url + '/order_food', JSON.stringify(food_order), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            console.log(data);
            
            console.log(data)
            console.log('Once successful, reset the cart and close the modal');
            setCart([]);
            router.back();
        } catch(err){
            console.log(err);
        }
        
    }
  return (
    <View style={[styles.container, { paddingBottom: bottom}]}>
        <BackButton />
        <FlatList 
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => { return item._id! }}/>
        <View style={{ alignItems: 'center'}}>
            <TouchableOpacity
            onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ShoppingCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: screenHeight * 0.08,
        backgroundColor: 'white',
      },
})