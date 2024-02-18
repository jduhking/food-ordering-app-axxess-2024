import { StyleSheet, Text, View, FlatList, ListRenderItemInfo, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Category } from '@/models/Category'
import { screenWidth } from '@/utils/Dimensions'

const Categories = ({ categories, setCategoryFilter, categoryFilter } : { categories: Category[], setCategoryFilter: (value: Category | undefined) => void, categoryFilter: Category | undefined }) => {

    const categoryRenderItem = ({item} : ListRenderItemInfo<Category>) => {
        const handleSelection = () => {
          if(categoryFilter === item){
            setCategoryFilter(undefined)
          } else {
            setCategoryFilter(item);
          }
        }
        return (
          <TouchableOpacity style={styles.category}
          onPress={handleSelection}>
            <Text style={{ textAlign: 'center'}}>{ item }</Text>
          </TouchableOpacity>
        )
      }
  return (
    <View style={styles.categories}>
          <FlatList 
          data={categories}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: '5%'
          }}
          renderItem={categoryRenderItem}
          keyExtractor={(category: Category) => category }
          horizontal
          showsHorizontalScrollIndicator={false}
          />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    categories: {
        flex: 0.2,
    },
    category: {
        borderRadius: 10,
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#a8a8a8',
        borderWidth: 1
    }
})