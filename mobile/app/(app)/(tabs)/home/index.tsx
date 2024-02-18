import { StyleSheet, View, Text, ListRenderItemInfo, FlatList } from 'react-native';
import { useAppStore } from '@/state/store';
import { screenHeight } from '@/utils/Dimensions';
import Patient from '@/models/Patient';
import { Category } from '@/models/Category';
import TopNav from '@/components/topnav';
import Categories from '@/components/categories';
import SearchBar from '@/components/searchbar';
import { useState } from 'react';
import Food from '@/models/Food';
import { Diets } from '@/models/Diets';
import FoodsList from '@/components/foodsList';

export default function HomeScreen() {

  const patient: Patient | undefined = useAppStore((state) => state.patient);
  const categories: Category[] = [Category.DRINK, Category.ENTREE, Category.SALAD, Category.SOUP, Category.SIDE]
  const [search, setSearch] = useState('');
  const foods: Food[] = [
    {
        _id: "1",
        name: "Chicken Noodle Soup",
        restricted_diets: [Diets.REGULAR, Diets.CARDIAC],
        category: Category.SOUP,
    },
    {
        _id: "2",
        name: "Grilled Salmon",
        restricted_diets: [Diets.CARDIAC],
        category: Category.ENTREE,
    },
    {
        _id: "3",
        name: "Mixed Green Salad",
        restricted_diets: [Diets.REGULAR],
        category: Category.SALAD,
    },
    {
        _id: "4",
        name: "Vegetable Stir Fry",
        restricted_diets: [Diets.REGULAR, Diets.CARDIAC],
        category: Category.ENTREE,
    },
    {
        _id: "5",
        name: "Fresh Fruit Platter",
        restricted_diets: [Diets.REGULAR],
        category: Category.SIDE,
    },
    {
        _id: "6",
        name: "Broccoli Cheddar Soup",
        restricted_diets: [Diets.REGULAR],
        category: Category.SOUP,
    },
    {
        _id: "7",
        name: "Apple Pie",
        restricted_diets: [Diets.REGULAR],
        category: Category.DESERT,
    },
    {
        _id: "8",
        name: "Baked Potato",
        restricted_diets: [Diets.REGULAR],
        category: Category.SIDE,
    },
    {
        _id: "9",
        name: "Roast Beef",
        restricted_diets: [Diets.CARDIAC],
        category: Category.ENTREE,
    },
    {
        _id: "10",
        name: "Orange Juice",
        restricted_diets: [Diets.REGULAR],
        category: Category.DRINK,
    },
];

  const onSearch = () => {
    console.log('search');
  }

  return (
    <View style={styles.container}>
      <TopNav />
      <View style={styles.page}>
        <Categories categories={categories} />
        <View style={{ paddingHorizontal: '5%'}}>
          <SearchBar onSearch={onSearch} value={search}/> 
        </View>
        <FoodsList foods={foods}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.08,
    backgroundColor: 'white'
  },
  page: {
    backgroundColor: '#f8f9fa', 
    flex: 1,
  },


});
