import { StyleSheet, Text, View, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import Food from '@/models/Food'
import { screenWidth } from '@/utils/Dimensions'
import { Link, useRouter } from 'expo-router'
import { Category } from '@/models/Category'

const FoodsList = ({ foods, categoryFilter } : { foods : Food[], categoryFilter: Category | undefined }) => {

  const filteredFoods = useMemo(() => foods.filter((food) => !categoryFilter || food.category === categoryFilter ), [foods, categoryFilter]);

  const router = useRouter();
     
  const foodRenderItem = ({ item } : ListRenderItemInfo<Food>) => {

      return (       /* @ts-ignore */
        <Link href={`food/${item._id}`}
        asChild >
          <TouchableOpacity style={styles.foodContainer} >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        </Link>
      )
    }

  return (
    <View style={{ flex: 1, paddingHorizontal: '6%'}}>
    <FlatList 
    data={filteredFoods}
    numColumns={2}
    contentContainerStyle={{ paddingVertical: '5%'}}
    columnWrapperStyle={{justifyContent:'space-between', }}
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