import React, {useContext} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import background from '../../assets/back.jpg';
import profile from '../../assets/profileone.jpg';
import {AuthContext} from '../firebase/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../globals/Globals';

//assset import

export default function CustomDrawer(props) {
  const {logout} = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.background}}>
        <View style={{padding: 10, backgroundColor: Colors.line}}>
          <Image
            source={profile}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 20,
              marginTop: 20,
              marginLeft: 0,
              //   margin to be changed to padding once background image is added
            }}></Image>
          <Text style={{color: '#00092C', fontSize: 18}}>Jude Fabiano</Text>
          <Text style={{color: '#8D8DAA', fontSize: 14}}>
            Judefabiano99@gmail.com
          </Text>
        </View>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social" size={22} />
            <Text
              style={{
                //   fontSize: 15,
                marginLeft: 25,
              }}>
              Share tuma
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit" size={22} />
            <Text
              style={{
                //   fontSize: 15,
                marginLeft: 25,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
