import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'JournalDatabase.db' });

const ViewJournal = () => {
  let [inputJournalId, setinputJournalId] = useState('');
  let [journalData, setJournalData] = useState({});

  let searchJournal = () => {
    console.log(inputJournalId);
    setJournalData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_journal where journal_id = ?',
        [inputJournalId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setJournalData(results.rows.item(0));
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
            placeholder="Введите Id записи"
            onChangeText={
              (inputJournalId) => setinputJournalId(inputJournalId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Search User" customClick={searchJournal} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Id: {journalData.journal_id}</Text>
            <Text>Дата: {journalData.Date}</Text>
            <Text>Часы занятий: {journalData.ChasyZanatiy}</Text>
            <Text>Факультет: {journalData.Fakultet}</Text>
            <Text>Курс: {journalData.Curse}</Text>
            <Text>Группа: {journalData.Group}</Text>
            <Text>Колличество студентов: {journalData.CollichesnvoStudentov}</Text>
            <Text>Лекции: {journalData.Lecture}</Text>
            <Text>Практические занятия: {journalData.PracticZanyatie}</Text>
            <Text>Лабораторные занятия: {journalData.LabZanyarie}</Text>
            <Text>Консультация: {journalData.Konsultacija}</Text>
            <Text>Экзамен: {journalData.Examen}</Text>
            <Text>Зачет: {journalData.Zachet}</Text>
            <Text>Практика НИР: {journalData.PracticNIR}</Text>
            <Text>Курсовой проект: {journalData.KursovoyProject}</Text>
            <Text>ВКР: {journalData.VKR}</Text>
            <Text>Руководство кафедра: {journalData.RukovodstvoKafedra}</Text>
            <Text>ГЭК: {journalData.GEK}</Text>
            <Text>Прочее: {journalData.Prochee}</Text>
            <Text>Итого: {journalData.Itog}</Text>
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

export default ViewJournal;