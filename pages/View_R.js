import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewRasp = () => {
  let [inputRaspId, setInputRaspId] = useState('');
  let [raspData, setRaspData] = useState({});

  let searchRasp = () => {
    console.log(inputRaspId);
    setRaspData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_Rasp where rasp_id = ?',
        [inputRaspId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setRaspData(results.rows.item(0));
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
            placeholder="Введите id записи"
            onChangeText={
              (inputRaspId) => setInputRaspId(inputRaspId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Поиск записи" customClick={searchRasp} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Id: {raspData.rasp_id}</Text>
            <Text>Неделя: {raspData.week}</Text>
            <Text>День недели: {raspData.day_week}</Text>
            <Text>Время: {raspData.time}</Text>
            <Text>Предмет: {raspData.subject}</Text>
            <Text>Группа: {raspData.groop}</Text>
          </View>
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

export default ViewRasp;