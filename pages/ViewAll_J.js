import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'JournalDatabase.db' });

const ViewAllJournal = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_journal',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.journal_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Id: {item.journal_id}</Text>
            <Text>Дата: {item.Date}</Text>
            <Text>Часы занятий: {item.ChasyZanatiy}</Text>
            <Text>Факультет: {item.Fakultet}</Text>
            <Text>Курс: {item.Curse}</Text>
            <Text>Группа: {item.Group}</Text>
            <Text>Колличество студентов: {item.CollichesnvoStudentov}</Text>
            <Text>Лекции: {item.Lecture}</Text>
            <Text>Практические занятия: {item.PracticZanyatie}</Text>
            <Text>Лабораторные занятия: {item.LabZanyarie}</Text>
            <Text>Консультация: {item.Konsultacija}</Text>
            <Text>Экзамен: {item.Examen}</Text>
            <Text>Зачет: {item.Zachet}</Text>
            <Text>Практика НИР: {item.PracticNIR}</Text>
            <Text>Курсовой проект: {item.KursovoyProject}</Text>
            <Text>ВКР: {item.VKR}</Text>
            <Text>Руководство кафедра: {item.RukovodstvoKafedra}</Text>
            <Text>ГЭК: {item.GEK}</Text>
            <Text>Прочее: {item.Prochee}</Text>
            <Text>Итого: {item.Itog}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
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

export default ViewAllJournal;