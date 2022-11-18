import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../globals/Globals';
import HomeScreen from '../BottomNavigatorScreens/HomeScreen/HomeScreen';
import DeliveryDetails from '../NewDelivery/DeliveryDetails/DeliveryDetails';
import OptionalDetails from '../NewDelivery/DeliveryDetails/OptionalDetails';
import ScheduledDeliveryDetails from '../NewDelivery/DeliveryDetails/ScheduledDeliveryDetails';
import BillSummary from '../NewDelivery/DeliveryStatus/BillSummary';
import DeliveryStatus from '../NewDelivery/DeliveryStatus/DeliveryStatus';
import LoadingScreen from '../NewDelivery/DeliveryStatus/LoadingScreen';
import MapTracking from '../NewDelivery/DeliveryStatus/MapTracking';
import LocationInput from '../NewDelivery/LocationInput/LocationInput';
import VehicleSelection from '../NewDelivery/VehicleSelection/VehicleSelection';
import PaymentMethod from '../Payment/PaymentMethod';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
        name="Home Screen"
        component={HomeScreen}
      />
      <Stack.Screen name="Location" component={LocationInput} />
      <Stack.Screen name="Delivery Details" component={DeliveryDetails} />
      <Stack.Screen
        name="Schedule Delivery"
        component={ScheduledDeliveryDetails}
      />
      <Stack.Screen name="Optional Details" component={OptionalDetails} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
        name="Vehicle Selection"
        component={VehicleSelection}
      />
      <Stack.Screen
        options={{presentation: 'modal', headerShown: false}}
        name="Payment Method"
        component={PaymentMethod}
      />
      <Stack.Screen name="Status" component={DeliveryStatus} />
      <Stack.Screen name="Bill" component={BillSummary} />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
          // headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
        name="Searching..."
        component={LoadingScreen}
      />
      <Stack.Screen name="Rider en-route" component={MapTracking} />
      {/* Take User to their order for tracking */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
