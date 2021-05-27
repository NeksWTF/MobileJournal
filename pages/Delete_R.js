import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const DeleteRasp = ({ navigation }) => {
  let [inputRaspId, setInputRaspId] = useState('');

  let deleteRasp = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_Rasp where rasp_id=?',
        [inputRaspId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Успех',
              'Данные удалены',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Raspisanie'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Запись не найдена');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Введите Id"
            onChangeText={
              (inputRaspId) => setInputRaspId(inputRaspId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Удалить запись" customClick={deleteRasp} />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DeleteRasp;