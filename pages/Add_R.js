import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const AddRaspisanie = ({ navigation }) => {
  let [week, setWeek] = useState('');
  let [day_week, setDay_week] = useState('');
  let [time, setTime] = useState('');
  let [subject, setSubject] = useState('');
  let [groop, setGroop] = useState('');

  let add_rasp = () => {
    console.log(week, day_week, time, subject, groop);

    if (!week) {
      alert('введите номер недели');
      return;
    }
    if (!day_week) {
      alert('введите день недели');
      return;
    }
    if (!time) {
      alert('введите время занятия');
      return;
    }
    if (!subject) {
      alert('введите название предмета');
      return;
    }
    if (!groop) {
      alert('введите номер группы');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_Rasp (week, day_week, time, subject, groop) VALUES (?,?,?,?,?)',
        [week, day_week, time, subject, groop],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Успех',
              'Запись добавлена',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Raspisanie'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Ошибка при добавлении');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="неделя"
                onChangeText={
                  (week) => setWeek(week)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="день недели"
                onChangeText={
                  (day_week) => setDay_week(day_week)
                }
                maxLength={25}
               // keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="время занятия"
                onChangeText={
                  (time) => setTime(time)
                }
                maxLength={25}
                // numberOfLines={5}
                // multiline={true}
                // style={{ textAlignVertical: 'top', padding: 10 }}
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="предмет"
                onChangeText={
                  (subject) => setSubject(subject)
                }
                maxLength={255}
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="группа"
                onChangeText={
                  (groop) => setGroop(groop)
                }
                maxLength={25}
                style={{ padding: 10 }}
              />
              <Mybutton title="Принять" customClick={add_rasp} />
            </KeyboardAvoidingView>
          </ScrollView>
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

export default AddRaspisanie;