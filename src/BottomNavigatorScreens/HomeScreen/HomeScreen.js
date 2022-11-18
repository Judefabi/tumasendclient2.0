import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import profile from '../../../assets/profileone.jpg';
import {Colors} from '../../../globals/Globals';
import {mapStyle} from '../../../model/CustomMap';
import {AuthContext} from '../../firebase/AuthProvider';

const HomeScreen = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);

  const [userLocation, setUserLocation] = useState({
    latitude: 0.6156622606659814,
    longitude: 34.76114899083128,
  });

  // console.log(userLocation);
  const coords = {latitude: 0.6156622606659814, longitude: 34.76114899083128};
  var name = auth().currentUser.displayName;
  const mapRef = useRef(null);

  const deliveryDetails = () => {
    navigation.navigate('Delivery Details');
    // navigation.navigate('Payment Method');
  };

  const navigateToCurrentLocation = () => {
    mapRef.current.animateToRegion(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        longitudeDelta: 0.02821,
        latitudeDelta: 0.0121,
      },
      2500,
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          longitudeDelta: 0.02821,
          latitudeDelta: 0.0121,
        }}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}>
        <Marker coordinate={userLocation}>
          <View>
            <View style={styles.markerView}>
              <FontAwesome5
                name="user-alt"
                style={styles.markerIcon}
                size={25}
              />
            </View>
            {/* <View style={styles.arrowBorder} />
            <View style={styles.arrow} /> */}
          </View>
        </Marker>
      </MapView>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => console.log('pressed')}
          style={styles.drawerButton}>
          <Ionicons
            name="menu-outline"
            size={30}
            color={Colors.text}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        {/* onPress={() => navigation.openDrawer()} */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {photo === null ? (
            <Image style={styles.userImg} source={profile} />
          ) : (
            <View style={styles.dummyView}>
              <Text style={styles.initials}>
                {name
                  .split(' ')
                  .map(function (word, index) {
                    return word.charAt(0).toUpperCase();
                  })
                  .join('')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.currentLocation}
        onPress={navigateToCurrentLocation}>
        <MaterialIcons
          name="my-location"
          size={30}
          style={styles.currentLocationIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatingAction}>
        <Feather name="box" size={30} style={styles.ordersIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deliveryPrompt} onPress={deliveryDetails}>
        <Text style={styles.newDeliveryText}>
          What are you delivering today?
        </Text>
        <FontAwesome name="send-o" size={30} style={styles.newDeliveryIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, //review screen heights
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // elevation: 5,
    position: 'absolute',
    width: Dimensions.get('window').width * 0.95,
    // paddingHorizontal: 10,
    // backgroundColor: Colors.background,
    top: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  menuIcon: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 100,
    size: 25,
  },
  name: {
    fontSize: 14,
    color: Colors.text,
  },
  drawerButton: {
    paddingHorizontal: 10,
    elevation: 10,
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
    textAlignVertical: 'center',
    marginVertical: 5,
    elevation: 10,
  },
  initials: {
    fontSize: 16,
    color: Colors.background,
    fontWeight: 'bold',
  },
  dummyView: {
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainColor,
    marginVertical: 5,
    elevation: 10,
  },
  locationButton: {
    position: 'absolute',
    bottom: 70,
    backgroundColor: Colors.background,
    padding: 15,
    width: Dimensions.get('window').width * 0.95,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButton: {
    width: Dimensions.get('window').width * 0.95,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    marginHorizontal: 10,
  },
  searchIcon: {
    color: Colors.primary,
    paddingHorizontal: 10,
  },
  markerIcon: {
    color: Colors.background,
  },
  markerView: {
    backgroundColor: Colors.mainColor,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  deliveryPrompt: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: Colors.background,
    padding: 15,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newDeliveryIcon: {
    color: Colors.primary,
  },
  newDeliveryText: {
    color: Colors.text,
  },
  floatingAction: {
    position: 'absolute',
    bottom: 170,
    right: 10,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 100,
    elevation: 10,
  },
  currentLocation: {
    position: 'absolute',
    bottom: 250,
    right: 10,
    backgroundColor: Colors.background,
    padding: 15,
    borderRadius: 100,
    elevation: 10,
  },
  ordersIcon: {
    color: Colors.background,
  },
  currentLocationIcon: {
    color: Colors.primary,
  },
  callout: {
    width: Dimensions.get('window').width * 0.5,
    backgroundColor: Colors.background,
    marginBottom: 20,
  },
});
