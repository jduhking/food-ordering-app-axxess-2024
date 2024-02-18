import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ShoppingIcon } from '@/icons/shopping';
import ProfileIcon from '@/components/profile-icon';
import { useAppStore } from '@/state/store';
import Patient from '@/models/Patient';
import { screenWidth } from '@/utils/Dimensions';
import { Link } from 'expo-router';
import { Meal } from '@/models/Meal';

const TopNav = () => {
    const patient: Patient | undefined = useAppStore((state) => state.patient);
    const cart = useAppStore((state) => state.cart);
    const getTime = () => {
      // Get the current date and time
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      // Define the greetings based on the time of day
      let greeting;
      if (currentHour < 12) {
          return Meal.BREAKFAST;
      } else if (currentHour < 18) {
        return Meal.LUNCH
      } else {
        return Meal.DINNER
      }

    }
    const time: Meal = getTime();
  return (
    <View style={styles.topNav}>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: 'white', borderRadius: 60, justifyContent: 'space-around', paddingHorizontal: '5%', paddingVertical: '2%', }}>
        {
          patient ? (
            <>
              <View style={{ marginRight: '5%'}}>
                <ProfileIcon patient={patient} />
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '600', fontFamily: 'SpaceMono'}}>Good {time === Meal.BREAKFAST ? "Morning" : time === Meal.LUNCH ? "Afternoon" : "Evening" }, {patient.first_name} 👋</Text>
              </View>
            </> ): (<Text>Patient does not exist</Text>)
        } 
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
          <Link
          href={'/shopping-cart/'}
          asChild>
            <TouchableOpacity>
              <ShoppingIcon size={32}/>
              {
                cart.length > 0 && (
                  <View
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    width: screenWidth * 0.042,
                    height: screenWidth * 0.042,
                    borderRadius: 200,
                    top: -5,
                    left: -5
                  }}>
                    <Text style={{
                      color: 'white'
                    }}>{cart.length}</Text>
                  </View>
                )
              }
              </TouchableOpacity>
            </Link> 
          </View>
          </View> 
      </View>
  )
}

export default TopNav

const styles = StyleSheet.create({
    topNav: {
        flexDirection: 'row', 
        paddingHorizontal: '2%',
        justifyContent: 'space-around',
        paddingVertical: '2%',
        
    }, 
})