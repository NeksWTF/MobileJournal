import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const Raspisanie = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_Rasp'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_Rasp', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_Rasp(rasp_id INTEGER PRIMARY KEY AUTOINCREMENT, week VARCHAR(25), day_week VARCHAR(25), time VARCHAR(25), subject VARCHAR(255),groop VARCHAR(25) )',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mybutton
            title="Добавить"
            customClick={() => navigation.navigate('Add_Rasp')}
          />
          <Mybutton
            title="Редактировать"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="Поиск"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="Просмотр"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Удалить"
            customClick={() => navigation.navigate('Delete')}
          />
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

export default Raspisanie;