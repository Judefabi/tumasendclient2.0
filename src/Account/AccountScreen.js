import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../firebase/AuthProvider';
// import image from '../../assets/profileone.jpg';
import {Colors} from '../../globals/Globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();
  //resolve image source for the dummy image
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  var name = auth().currentUser.displayName;
  // const {user} = useContext(AuthContext);
  const choosePhotoFromGallery = () => {
    //introduce camera option in future
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // console.log('image upload successful');
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 15}}>
      {/* top section -user details */}
      <View style={styles.profileView}>
        <View flexDirection="row">
          {image !== null ? (
            <Image style={styles.userImg} source={{uri: image}} />
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

          <TouchableOpacity onPress={choosePhotoFromGallery}>
            <View style={styles.edit}>
              <MaterialIcons name="edit" size={20} color={Colors.background} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.userName}>
            {/* //fetch name and convert to Titlecase */}
            {name
              // 'jude fabiano'
              .split(' ')
              .map(function (word, index) {
                return (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
              })
              .join(' ')}
          </Text>
          <Text style={styles.userEmail}>
            {
              // 'judefabiano99@gmail.com'
              auth().currentUser.email
            }
          </Text>
        </View>
      </View>
      {/* subsidiary info */}
      <View
        style={{
          backgroundColor: Colors.line,
          height: 0.2,
          width: '100%',
        }}></View>
      <View style={styles.centerView}>
        <TouchableOpacity
          style={styles.cardView}
          onPress={() => navigation.navigate('Wallet Main')}>
          <View style={styles.iconView}>
            <Ionicons name="wallet" size={25} style={styles.cardIcon} />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.cardTitle}>Wallet</Text>
            {/* <Feather name="arrow-right" size={25} style={styles.arrowIcon} /> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <View style={styles.iconView}>
            <FontAwesome5 name="toolbox" size={25} style={styles.cardIcon} />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.cardTitle}>Orders</Text>
            {/* <Feather name="arrow-right" size={25} style={styles.arrowIcon} /> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <View style={styles.iconView}>
            <FontAwesome name="gear" size={25} style={styles.cardIcon} />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.cardTitle}>Settings</Text>
            {/* <Feather name="arrow-right" size={25} style={styles.arrowIcon} /> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <View style={styles.iconView}>
            <MaterialIcons
              name="privacy-tip"
              size={25}
              style={styles.cardIcon}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.cardTitle}>Terms & conditions</Text>
            {/* <Feather name="arrow-right" size={25} style={styles.arrowIcon} /> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <View style={styles.iconView}>
            <MaterialIcons name="logout" size={25} style={styles.cardIcon} />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.cardTitle}>Sign Out</Text>
            {/* <Feather name="arrow-right" size={25} style={styles.arrowIcon} /> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpButton}>
          <FontAwesome5
            name="headset"
            size={40}
            style={styles.helpButtonIcon}
          />
          <Text style={styles.helpText}>How can we Help?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        <FontAwesome name="copyright" size={20} />
        <Text style={styles.copyrightText}>Tumasend 2022</Text>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileView: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'center',
    borderColor: Colors.line,
    borderWidth: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  userEmail: {
    fontSize: 15,
  },
  logoutIcon: {
    color: Colors.text,
    paddingHorizontal: 25,
  },
  edit: {
    backgroundColor: Colors.text,
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 100,
    alightItems: 'center',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 35,
    color: Colors.background,
    fontWeight: 'bold',
  },
  dummyView: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainColor,
  },
  centerView: {
    paddingVertical: 20,
  },
  cardView: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  helpButton: {
    paddingVertical: 100,
    flexDirection: 'row',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.8,
  },
  iconView: {
    width: Dimensions.get('window').width * 0.1,
  },
  arrowIcon: {
    color: Colors.line,
  },
  cardIcon: {
    color: Colors.line,
  },
  cardTitle: {
    color: Colors.text,
    fontWeight: '500',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.line,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30,
    justifyContent: 'center',
  },
  helpText: {
    fontWeight: 'bold',
    paddingHorizontal: 40,
    fontSize: 16,
    color: Colors.text,
  },
  helpButtonIcon: {
    color: Colors.mainColor,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
