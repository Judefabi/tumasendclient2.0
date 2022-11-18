import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
import {Vehicles} from '../../../model/CarsData';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../../globals/Globals';
import {addDelivery} from '../../firebase/PostDelivery';
import {mapStyle} from '../../../model/CustomMap';
import {maps_api_key} from '../../../globals/Apikey';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAka7sIWrqMO568WM1X97LMQjHDLOCOo6c';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const VehicleSelection = ({route}) => {
  const navigation = useNavigation();
  const {
    pickupLocation,
    deliveryLocation,
    selectedCategory,
    selectedPackage,
    date,
    comments,
    selectedAccessibility,
    selectedAvailability,
    selectedWeightClass,
  } = route.params;
  // console.log(route.params);
  const origin = {
    latitude: pickupLocation.geometry.location.lat,
    longitude: pickupLocation.geometry.location.lng,
  };
  const destination = {
    latitude: deliveryLocation.geometry.location.lat,
    longitude: deliveryLocation.geometry.location.lng,
  };
  const originName = pickupLocation.name;

  const destinationName = deliveryLocation.name;

  const initialMapState = {
    Vehicles,
  };
  const [state, setState] = useState(initialMapState);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [distance, setDistance] = useState(0);
  const [priceRate, setPriceRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const totalAmount = priceRate * distance;
  const amount = totalAmount.toFixed(0);

  const paymentMethod = () => {
    navigation.navigate('Payment Method');
  };

  const userId = auth().currentUser.uid;

  const confirmDelivery = async () => {
    setLoading(true);
    // generate id
    const deliveryId = uuid.v4();

    console.log('changed value', loading);

    console.log(
      'deliveryId',
      deliveryId,
      'origin',
      origin,
      'destination',
      destination,
      'selectedCategory',
      selectedCategory,
      'selectedPackage',
      selectedPackage,
      'selectedAccessibility',
      selectedAccessibility,
      'date',
      date,
      'originName',
      originName,
      'destinationName',
      destinationName,
      'selectedVehicle',
      selectedVehicle,
      'amount',
      amount,
      'userId',
      userId,
      'selectedAvailability',
      selectedAvailability,
      'comments',
      comments,
      'selectedWeightClass',
      selectedWeightClass,
    );
    // save to firestore
    await addDelivery(
      deliveryId,
      origin,
      destination,
      selectedCategory,
      selectedPackage,
      selectedAccessibility,
      date,
      originName,
      destinationName,
      selectedVehicle,
      navigation,
      amount,
      userId,
      selectedAvailability,
      comments,
    );
  };

  const cancelOrder = () => {
    setLoading(!loading);
    console.log('changed value', loading);
  };

  const mapRef = useRef(null);
  const edgePaddingValue = 60;
  const edgePadding = {
    top: 100,
    bottom: 100,
    left: edgePaddingValue,
    right: edgePaddingValue,
  };

  const fitToCoords = () => {
    mapRef.current?.fitToCoordinates([origin, destination], {
      edgePadding: {
        top: edgePaddingValue,
        bottom: edgePaddingValue,
        left: edgePaddingValue,
        right: edgePaddingValue,
      },
      animated: true,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onLayout={fitToCoords()}
        region={{
          latitude: pickupLocation.geometry.location.lat,
          longitude: pickupLocation.geometry.location.lng,
          longitudeDelta: 0.02821,
          latitudeDelta: 0.0121,
        }}
        customMapStyle={mapStyle}>
        <Marker coordinate={origin}>
          {/* <View style={[styles.tooltip, {borderLeftColor: '#000'}]}>
            <Text style={styles.tooltiptext}>{originName}</Text>
            <View
              style={{
                backgroundColor: 'black',
              }}>
              <View style={{alignItems: 'center', paddingHorizontal: 2}}>
                <Text style={{color: 'white'}}>A</Text>
                <Text style={{fontSize: 10, color: 'white'}}>START</Text>
              </View>
            </View>
          </View> */}
          <View style={styles.pickupLocMarker}>
            <FontAwesome5
              name="user-alt"
              style={styles.pickupMarker}
              size={15}
            />
          </View>
        </Marker>
        <Marker coordinate={destination}>
          {/* <View style={[styles.tooltip, {borderLeftColor: '#2A2550'}]}>
            <Text style={styles.tooltiptext}>{destinationName}</Text>
            <View
              style={{
                backgroundColor: 'black',
              }}>
              <View style={{alignItems: 'center', paddingHorizontal: 2}}>
                <Text style={{color: 'white'}}>A</Text>
                <Text style={{fontSize: 10, color: 'white'}}>STOP</Text>
              </View>
            </View>
          </View> */}
          <View style={styles.deliveryLocMarker}>
            <MaterialIcons
              name="my-location"
              size={15}
              style={styles.deliveryMarker}
            />
          </View>
        </Marker>
        <MapViewDirections
          apikey={maps_api_key}
          origin={origin}
          strokeColor={Colors.text}
          destination={destination}
          strokeWidth={2.5}
          onReady={result => {
            setDistance(result.distance);
            setTime(result.duration);
            // fitToCoords();
          }}
        />
      </MapView>
      {/* {loading ? (
        <View style={styles.bottomContent}>
          <View style={styles.dummyModalLine} />
          <Lottie
            style={styles.lottie}
            source={require('../../../animations/scanner.json')}
            autoPlay
            loop
          />
          <View
            style={[
              styles.buttonSection,
              {alignItems: 'center', flexDirection: 'row'},
            ]}>
            <TouchableOpacity onPress={cancelOrder}>
              <View style={styles.button}>
                <Text style={styles.completeText}>CANCEL ORDER</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : ( */}
      <View style={styles.bottomContent}>
        <View style={styles.dummyModalLine} />

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'column',
              width: Dimensions.get('window').width,
            }}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.pickupLocMarker}>
                <FontAwesome5
                  name="star"
                  style={styles.pickupMarker}
                  size={15}
                />
              </View>
              <Text>{originName}</Text>
            </View>
            <View style={{flexDirection: 'column', paddingHorizontal: 10}}>
              {[...Array(3).keys()].map(index => {
                return <View key={index} style={styles.dottedLine}></View>;
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.deliveryLocMarker}>
                <MaterialIcons
                  name="my-location"
                  size={15}
                  style={styles.deliveryMarker}
                />
              </View>
              <Text>{destinationName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.categoryWrapper}>
          {Vehicles.map((vehicle, id) => {
            return (
              <TouchableOpacity
                key={vehicle.id}
                onPress={() => {
                  setSelectedVehicle(vehicle);
                  setPriceRate(vehicle.priceRate);
                }}>
                <View
                  style={[
                    styles.container,
                    {
                      backgroundColor:
                        selectedVehicle?.id === vehicle.id
                          ? Colors.text
                          : Colors.background,
                    },
                  ]}>
                  <Image style={styles.image} source={vehicle.image} />
                  <Text
                    style={[
                      styles.type,
                      {
                        color:
                          selectedVehicle?.id === vehicle.id
                            ? Colors.background
                            : Colors.text,
                        fontWeight:
                          selectedVehicle?.id === vehicle.id ? '900' : '600',
                      },
                    ]}>
                    {vehicle.type}
                  </Text>
                  <Text
                    style={[
                      styles.price,
                      {
                        color:
                          selectedVehicle?.id === vehicle.id
                            ? Colors.background
                            : Colors.text,
                        fontWeight:
                          selectedVehicle?.id === vehicle.id ? '400' : 'normal',
                      },
                    ]}>
                    KES. {selectedVehicle?.id === vehicle.id ? amount : '0.00'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.payment} onPress={paymentMethod}>
          <View style={styles.deliveryLocMarker}>
            <MaterialIcons
              name="my-location"
              size={15}
              style={styles.deliveryMarker}
            />
          </View>
          <Text>Choose Payment Method</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.buttonSection,
            {alignItems: 'center', flexDirection: 'row'},
          ]}>
          <TouchableOpacity onPress={confirmDelivery}>
            <View style={styles.button}>
              <Text style={styles.completeText}>COMPLETE ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

export default VehicleSelection;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.17,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.45,
  },
  dotWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  tooltip: {
    // width: 220,
    backgroundColor: '#fff',
    position: 'relative',
    flexDirection: 'row',
    borderLeftWidth: 6,
    justifyContent: 'space-between',
    // padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    borderRadius: 15,
    marginBottom: 10,
  },
  tooltiptext: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bottomContent: {
    position: 'absolute',
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    bottom: 60,
    marginTop: 20,
    backgroundColor: Colors.background,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopColor: Colors.line,
    borderTopWidth: 0.5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // top: Dimensions.get('window').height / 1.65,
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  type: {
    marginTop: 0,
  },
  priceSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
  estimateSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
    color: 'grey',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  valueTitle: {
    fontSize: 16,
    color: 'grey',
  },
  priceDetail: {
    fontSize: 10,
    color: 'grey',
    // alignSelf: "center",
  },
  buttonSection: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.95,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  completeText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  dummyModalLine: {
    width: Dimensions.get('window').width * 0.15,
    height: 4,
    backgroundColor: Colors.line,
    alignSelf: 'center',
  },
  pickupMarker: {
    color: Colors.background,
  },
  deliveryMarker: {
    color: Colors.background,
  },
  pickupLocMarker: {
    backgroundColor: Colors.mainColor,
    padding: 7,
    marginVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deliveryLocMarker: {
    backgroundColor: Colors.primary,
    padding: 7,
    marginVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  dottedLine: {
    width: 3,
    height: 2,
    backgroundColor: Colors.text,
    marginVertical: 2,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.text,
    borderWidth: 0.5,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  lottie: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
