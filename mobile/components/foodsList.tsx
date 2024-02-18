import { StyleSheet, Text, View, FlatList, ListRenderItemInfo } from 'react-native'
import React from 'react'
import Food from '@/models/Food'
import { screenWidth } from '@/utils/Dimensions'

const FoodsList = ({ foods } : { foods : Food[] }) => {
    
    const foodRenderItem = ({ item } : ListRenderItemInfo<Food>) => {
        return (
          <View style={styles.foodContainer}>
            <Text>{item.name}</Text>
          </View>
        )
      }
  return (
    <View style={{ flex: 1}}>
    <FlatList 
    data={foods}
    numColumns={2}
    contentContainerStyle={{ alignItems: 'center'}}
    columnWrapperStyle={{ gap: 20}}
    renderItem={foodRenderItem}
    keyExtractor={(food: Food) => { return food._id}}
    />
  </View>
  )
}

export default FoodsList

const styles = StyleSheet.create({
    foodContainer: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
        backgroundColor: 'white', 
        borderColor: '#a8a8a8',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
    }
})