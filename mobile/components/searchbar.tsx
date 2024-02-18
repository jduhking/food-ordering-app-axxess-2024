import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { screenHeight } from '../utils/Dimensions';
import { SearchIcon } from '../icons/search';


const SearchBar = ({ onSearch, value } : { onSearch: (text: string) => void, value: string | undefined}) => {

  return (
    <View style={[styles.searchContainer]}>
        <View style={{
            marginRight: '3%'
        }}>
            <SearchIcon size={32} color={'#8d8d8d'} />
        </View>
        <TextInput
        style={{ fontSize: 22}}
        placeholder='Search'
        placeholderTextColor={'#a8a8a8'}
        onChangeText={onSearch}
        value={value}
        />  
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        borderRadius: 60,
        width: '100%',
        height: screenHeight * 0.05,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        borderColor: '#a8a8a8',
        borderWidth: 1
    }
})