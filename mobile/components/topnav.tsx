import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ShoppingIcon } from '@/icons/shopping';
import ProfileIcon from '@/components/profile-icon';
import { useAppStore } from '@/state/store';
import Patient from '@/models/Patient';
import { screenWidth } from '@/utils/Dimensions';

const TopNav = () => {
    const patient: Patient | undefined = useAppStore((state) => state.patient);
    const cart = useAppStore((state) => state.cart);
  return (
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
       <View>   
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
       </View>
      </View>
  )
}

export default TopNav

const styles = StyleSheet.create({
    topNav: {
        flexDirection: 'row', 
        paddingHorizontal: '5%',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#a8a8a8',
        paddingVertical: '2%',
    }, 
})