import auth from '@react-native-firebase/auth';

export default userData = {
  userId: auth().currentUser.uid,
  slicedId: userId.slice(0, 12),
};

userId = auth().currentUser.uid;
// export default slicedId = user
