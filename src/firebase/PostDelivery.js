import firestore from '@react-native-firebase/firestore';

// const navigation = useNavigation();
export const addDelivery = (
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
) => {
  try {
    return firestore()
      .collection('Deliveries')
      .doc(deliveryId)
      .set({
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
        amount,
        userId,
        selectedAvailability,
        comments,
      })
      .then(() => {
        // console.log('Success');
        navigation.navigate('Searching...', {
          deliveryId,
        });
      });
  } catch (error) {
    console.log('Error', error);
  }
};
