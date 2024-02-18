import { StyleSheet, Text, View, FlatList, ListRenderItemInfo, TouchableOpacity, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import Food from '@/models/Food'
import { screenWidth } from '@/utils/Dimensions'
import { Link, useRouter } from 'expo-router'
import { Category } from '@/models/Category'
import { PlusIcon } from '@/icons/plus'

const FoodsList = ({ foods, categoryFilter, search } : { foods : Food[], categoryFilter: Category | undefined, search: string | undefined}) => {

  const filteredFoods = useMemo(() => foods.filter((food) => !categoryFilter || food.category === categoryFilter).filter((food) => (!search || search.length > 0 && food.name.toLowerCase().includes(search.toLowerCase()))), [foods, categoryFilter, search]);
  console.log(search)
  const router = useRouter();
     
  const foodRenderItem = ({ item } : ListRenderItemInfo<Food>) => {

      return (       /* @ts-ignore */
        <Link href={`food/${item.name}`}
        asChild >
          <TouchableOpacity style={styles.foodContainer} >  
            <View style={styles.foodImageContainer}>
              <Image 
              style={styles.picture}
              source={{ uri: item.picture_link}}
              />
            </View>
            <View
            style={{ position: 'absolute',
            right: '5%', top: '5%'}}>
              <PlusIcon size={32} color={"#780000"}/>
            </View>
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
    keyExtractor={(food: Food) => { return food._id!}}
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
    },
    foodImageContainer: {
      width: screenWidth * 0.25,
      height: screenWidth * 0.25,
      borderRadius: 200,
      marginBottom: '5%',
      overflow: 'hidden'
  },
  picture: {
      resizeMode: "cover",
      width: "100%",
      height: "100%",
    },
})