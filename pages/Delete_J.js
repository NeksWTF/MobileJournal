import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'JournalDatabase.db' });

const DeleteJournal = ({ navigation }) => {
  let [inputJournalId, setinputJournalId] = useState('');

  let deleteJournal = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_journal where journal_id=?',
        [inputJournalId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Успех',
              'Данные удалены',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Journal'),
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
              (inputJournalId) => setinputJournalId(inputJournalId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Удалить запись" customClick={deleteJournal} />
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

export default DeleteJournal;