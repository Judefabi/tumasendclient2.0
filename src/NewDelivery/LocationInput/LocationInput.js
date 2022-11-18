import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import CustomPlaceList from '../../components/CustomPlaceList';
import {Colors} from '../../../globals/Globals';
import {maps_api_key} from '../../../globals/Apikey';

const LocationInput = ({route, navigation}) => {
  navigator.geolocation = require('react-native-geolocation-service');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  // const navigation = useNavigation();
  const {
    selectedCategory,
    selectedPackage,
    date,
    comments,
    selectedAvailability,
    selectedAccessibility,
    selectedWeightClass,
  } = route.params;
  
  useEffect(() => {
    if (pickupLocation && deliveryLocation) {
      navigation.navigate('Vehicle Selection', {
        selectedCategory,
        selectedPackage,
        date,
        comments,
        selectedAccessibility,
        selectedAvailability,
        pickupLocation,
        deliveryLocation,
        selectedWeightClass,
      });
    }
  }, [pickupLocation, deliveryLocation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <GooglePlacesAutocomplete
          styles={{
            textInput: styles.searchBox,
            container: {
              position: 'absolute',
              top: 0,
              left: 25,
              right: 10,
            },
            listView: {
              position: 'absolute',
              top: 115,
            },
            separator: {
              backgroundColor: 'white',
              height: 0.5,
            },
          }}
          suppressDefaultStyles
          disableScroll={false}
          placeholder="Pickup Location"
          currentLocation={true}
          currentLocationLabel="Nearby Places"
          onPress={(data, details = null) => {
            setPickupLocation(details);
            // console.log(pickupLocation);
          }}
          fetchDetails
          enablePoweredByContainer={false}
          query={{
            key: maps_api_key,
            language: 'en',
            components: 'country:ke',
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          renderRow={data => <CustomPlaceList data={data} />}
        />
        <GooglePlacesAutocomplete
          styles={{
            textInput: styles.searchBox,
            container: {
              position: 'absolute',
              top: 65,
              left: 25,
              right: 10,
            },
            listView: {
              position: 'absolute',
              top: 50,
            },
            separator: {
              backgroundColor: 'white',
              height: 1,
            },
          }}
          suppressDefaultStyles
          disableScroll={false}
          placeholder="Delivery Location"
          currentLocation={true}
          currentLocationLabel="Nearby Places"
          onPress={(data, details = null) => {
            setDeliveryLocation(details);
            console.log(deliveryLocation);
          }}
          fetchDetails
          query={{
            key: maps_api_key,
            language: 'en',
            components: 'country:ke',
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          enablePoweredByContainer={false}
          renderRow={data => <CustomPlaceList data={data} />}
        />
        <View style={styles.circle} />
        <View>
          {[...Array(4).keys()].map(index => {
            return <View key={index} style={styles.dottedLine}></View>;
          })}
        </View>
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  searchView: {
    position: 'absolute',
    top: 20,
    width: Dimensions.get('window').width,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: Colors.line,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0.1,
    borderColor: Colors.line,
    backgroundColor: Colors.line,
  },

  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    position: 'absolute',
    top: 20,
    left: 15,
    borderRadius: 100,
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    position: 'absolute',
    top: 80,
    left: 15,
    marginRight: 5,
  },
  line: {
    width: 5,
    height: 5,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 28,
    left: 17,
    marginVertical: 5,
  },
  dottedLine: {
    backgroundColor: Colors.text,
    height: 5,
    width: 5,
    marginHorizontal: 2,
    // position: 'absolute',
    top: 20,
    left: 15,
    marginVertical: 5,
  },
});
