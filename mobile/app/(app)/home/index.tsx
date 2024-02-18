import { StyleSheet, View, Text, ListRenderItemInfo, FlatList } from 'react-native';
import { useAppStore } from '@/state/store';
import { screenHeight } from '@/utils/Dimensions';
import Patient from '@/models/Patient';
import { Category } from '@/models/Category';
import TopNav from '@/components/topnav';
import Categories from '@/components/categories';
import SearchBar from '@/components/searchbar';
import { useState, useEffect } from 'react';
import FoodsList from '@/components/foodsList';
import axios from 'axios';
import Food from '@/models/Food';

export default function HomeScreen() {

  const patient: Patient | undefined = useAppStore((state) => state.patient);
  const categories: Category[] = [Category.DRINK, Category.ENTREE, Category.SALAD, Category.SOUP, Category.SIDE]
  const [search, setSearch] = useState<string>();
  const [foods, setFoods] = useState<Food[]>();
  const [categoryFilter, setCategoryFilter] = useState<Category>();
  const cart = useAppStore((state) => state.cart)
  const fetchFood = async () => {
    const server_url = process.env.EXPO_PUBLIC_BACKEND_URL;
    console.log(server_url)
    const { data } = await axios.get(server_url + '/get_menu');
    console.log(data)
    setFoods(data)
  }
  useEffect(() => {
    fetchFood();
  }, [])

  const onSearch = (text: string) => {
    setSearch(text)
  }
  return (
    <View style={styles.container}>
      <TopNav />
      <View style={styles.page}>
        <Categories categories={categories} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter}/>
        <View style={{ paddingHorizontal: '5%'}}>
          <SearchBar onSearch={onSearch} value={search}/> 
        </View>
        {
        foods && <FoodsList foods={foods} categoryFilter={categoryFilter} search={search} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.08,
    backgroundColor: '#780000'
  },
  page: {
    backgroundColor: '#fdf0d5', 
    flex: 1,
  },


});
