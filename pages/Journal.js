import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'JournalDatabase.db' });

const Journal = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_journal'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_journal', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_journal(journal_id INTEGER PRIMARY KEY AUTOINCREMENT, Date VARCHAR(30), ChasyZanatiy VARCHAR(30), Fakultet VARCHAR(30), Curse VARCHAR(30), Group VARCHAR(30), CollichesnvoStudentov VARCHAR(30), Lecture VARCHAR(30), PracticZanyatie VARCHAR(30), LabZanyarie VARCHAR(30), Konsultacija VARCHAR(30), Examen VARCHAR(30), Zachet VARCHAR(30), PracticNIR VARCHAR(30), KursovoyProject VARCHAR(30), VKR VARCHAR(30), RukovodstvoKafedra VARCHAR(30), GEK VARCHAR(30), Prochee VARCHAR(30), Itog VARCHAR(30))',
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
            customClick={() => navigation.navigate('Add_J')}
          />
          <Mybutton
            title="Редактировать"
            customClick={() => navigation.navigate('Update_J')}
          />
          <Mybutton
            title="Поиск"
            customClick={() => navigation.navigate('View_J')}
          />
          <Mybutton
            title="Просмотр"
            customClick={() => navigation.navigate('ViewAll_J')}
          />
          <Mybutton
            title="Удалить"
            customClick={() => navigation.navigate('Delete_J')}
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

export default Journal;