import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ProfileIcon = ({ picture_link } : { picture_link: string}) => {
  return (
    <View style={styles.profileContainer}>
      <Image source={{ uri: picture_link}} style={styles.picture}/>
    </View>
  )
}

export default ProfileIcon

const styles = StyleSheet.create({
    profileContainer: {
        width: 48,
        height: 48,
        borderRadius: 200,
        overflow: 'hidden'
    },
    picture: {
        resizeMode: "cover",
        width: "100%",
        height: "100%",
      },
})