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
import { sub } from 'react-native-reanimated';

var db = openDatabase({ name: 'UserDatabase.db' });

const UpdateRasp = ({ navigation }) => {
  let [inputRaspId, setInputRaspId] = useState('');
  let [week, setWeek] = useState('');
  let [day_week, setDay_week] = useState('');
  let [time, setTime] = useState('');
  let [subject, setSubject] = useState('');
  let [groop, setGroop] = useState('');

  let updateAllStates = (week, day_week, time, subject, groop) => {
    setWeek(week);
    setDay_week(day_week);
    setTime(time);
    setSubject(subject);
    setGroop(groop);
  };

  let searchRasp = () => {
    console.log(inputRaspId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_Rasp where rasp_id = ?',
        [inputRaspId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.week,
              res.day_week,
              res.time,
              res.subject,
              res.groop
            );
          } else {
            alert('Запись не найдена');
            updateAllStates('', '', '','','');
          }
        }
      );
    });
  };
  let UpdateRasp = () => {
    console.log(inputRaspId, week, day_week, time, subject, groop);

    if (!inputRaspId) {
      alert('Пожалуйста введите id');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_Rasp set week=?, day_week=? , time=?, subject=?, groop=? where rasp_id=?',
        [week, day_week, time, subject, groop, inputRaspId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Успешно',
              'Данные обновлены',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Raspisanie'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Не удалось обновить');
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
                placeholder="Введите Id"
                style={{ padding: 10 }}
                onChangeText={
                  (inputRaspId) => setInputRaspId(inputRaspId)
                }
              />
              <Mybutton
                title="Поиск записи"
                customClick={searchRasp} 
              />
              <Mytextinput
                placeholder="введите неделю"
                value={week}
                style={{ padding: 10 }}
                onChangeText={
                  (week) => setWeek(week)
                }
              />
              <Mytextinput
                placeholder="введите день недели"
                value={'' + day_week}
                onChangeText={
                  (day_week) => setDay_week(day_week)
                }
                maxLength={10}
                style={{ padding: 10 }}
               // keyboardType="numeric"
              />
              <Mytextinput
                value={time}
                placeholder="введите время занятия"
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
                placeholder="введите название предмета"
                value={'' + subject}
                onChangeText={
                  (subject) => setSubject(subject)
                }
                maxLength={255}
                style={{ padding: 10 }}
               // keyboardType="numeric"
              />
              <Mytextinput
                placeholder="Введите номер группы"
                value={'' + groop}
                onChangeText={
                  (groop) => setGroop(groop)
                }
                maxLength={25}
                style={{ padding: 10 }}
               // keyboardType="numeric"
              />
              <Mybutton
                title="Редактирование расписания"
                customClick={UpdateRasp}
              />
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

export default UpdateRasp;