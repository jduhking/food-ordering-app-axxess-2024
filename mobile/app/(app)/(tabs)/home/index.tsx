import { StyleSheet, View, Text, Image, FlatList, ListRenderItem, ListRenderItemInfo } from 'react-native';
import { useAppStore } from '@/state/store';
import { screenHeight } from '@/utils/Dimensions';
import ProfileIcon from '@/components/ProfileIcon';
import Patient from '@/models/Patient';
import { ShoppingIcon } from '@/icons/shopping';
import { Category } from '@/models/Category';



export default function HomeScreen() {

  const patient: Patient | undefined = useAppStore((state) => state.patient);
  const categories: Category[] = [Category.DRINK, Category.ENTREE, Category.SALAD, Category.SOUP, Category.SIDE]

  const categoryRenderItem = ({item} : ListRenderItemInfo<Category>) => {
    return (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  }



  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
      <View style={{ flexDirection: 'row', flex: 1}}>
        {
          patient ? (
            <>
              <View style={{ marginRight: '5%'}}>
                <ProfileIcon picture_link={patient.picture_link} />
              </View>
              <View>
                <Text>{patient.first_name}</Text>
                <Text>{patient.last_name}</Text>
              </View>
            </> ): (<Text>Patient does not exist</Text>)
        } 
       </View>
       <ShoppingIcon size={32}/>
      </View>
      <View>
        <FlatList 
        data={categories}
        renderItem={categoryRenderItem}
        keyExtractor={(category: Category) => category }
        horizontal
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.08,
  },
  topNav: {
    flexDirection: 'row', 
    paddingHorizontal: '5%',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingVertical: '2%'
  }
});
