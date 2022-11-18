import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../globals/Globals';
import ChatList from './ChatList';

const NotificationsScreen = () => {
  var userId = auth().currentUser.uid;

  // console.log('Id', slicedId);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    //wrap this in a reducer or filter or wrap the results instead
    const subscriber = firestore()
      .collection('chats')
      .where('client.clientId', '==', userId) //use reducer to fetch chats where this user is
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(documentSnapshot => {
          messages.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        const sortedMessages = messages.sort(
          (m1, m2) =>
            new Date(m2?.timeUpdated?.toDate()) -
            new Date(m1?.timeUpdated?.toDate()),
        );
        setChats(messages);
        // console.log('After sorting', sortedMessages);
      });

    return () => subscriber();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        {chats.map((chat, id) => {
          return <ChatList key={id} chat={chat} chatId={id} />;
        })}
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
