import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView, Text } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'JournalDatabase.db' });

const AddJournal = ({ navigation }) => {
  let [Date, setDate] = useState('');
  let [ChasyZanatiy, setChasyZanatiy] = useState('');
  let [Fakultet, setFakultet] = useState('');
  let [Curse, setCurse] = useState('');
  let [Group, setGroup] = useState('');
  let [CollichesnvoStudentov, setCollichesnvoStudentov] = useState('');
  let [Lecture, setLecture] = useState('');
  let [PracticZanyatie, setPracticZanyatie] = useState('');
  let [LabZanyarie, setLabZanyarie] = useState('');
  let [Konsultacija, setKonsultacija] = useState('');
  let [Examen, setExamen] = useState('');
  let [Zachet, setZachet] = useState('');
  let [PracticNIR, setPracticNIR] = useState('');
  let [KursovoyProject, setKursovoyProject] = useState('');
  let [VKR, setVKR] = useState('');
  let [RukovodstvoKafedra, setRukovodstvoKafedra] = useState('');
  let [GEK, setGEK] = useState('');
  let [Prochee, setProchee] = useState('');
  let [Itog, setItog] = useState('');
  

  let add_journal = () => {
    console.log(Date, ChasyZanatiy, Fakultet, Curse, Group, CollichesnvoStudentov, Lecture, PracticZanyatie, LabZanyarie, Konsultacija, Examen, Zachet, PracticNIR, KursovoyProject, VKR, RukovodstvoKafedra, GEK, Prochee, Itog);
try{
    if (!ChasyZanatiy) {
      alert('Введите Часы занятий');
      return;
    }
    if (!Fakultet) {
      alert('Введите Факультет');
      return;
    }
    if (!Curse) {
      alert('Введите Курс');
      return;
    }
    if (!Group) {
      alert('Введите группу');
      return;
    }
    if (!CollichesnvoStudentov) {
      alert('Введите колличество студентов');
      return;
    }
  }catch{console.log('исключение')}
    try{
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_journal (Date, ChasyZanatiy, Fakultet, Curse, Group, CollichesnvoStudentov, Lecture, PracticZanyatie, LabZanyarie, Konsultacija, Examen, Zachet, PracticNIR, KursovoyProject, VKR, RukovodstvoKafedra, GEK, Prochee, Itog) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [Date, ChasyZanatiy, Fakultet, Curse, Group, CollichesnvoStudentov, Lecture, PracticZanyatie, LabZanyarie, Konsultacija, Examen, Zachet, PracticNIR, KursovoyProject, VKR, RukovodstvoKafedra, GEK, Prochee, Itog],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Запись добавлена',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Journal'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Ошибка при добавлении');
        }
      );
    });
    }catch{console.log('исключение')}
  };
  try{
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
                <Mytextinput
                placeholder="Дата"
                onChangeText={
                  (Date) => setDate(Date)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Часы занятий"
                onChangeText={
                  (ChasyZanatiy) => setChasyZanatiy(ChasyZanatiy)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Факультет"
                onChangeText={
                  (Fakultet) => setFakultet(Fakultet)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Курс"
                onChangeText={
                  (Curse) => setCurse(Curse)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Группа"
                onChangeText={
                  (Group) => setGroup(Group)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Колличество студентов"
                onChangeText={
                  (CollichesnvoStudentov) => setCollichesnvoStudentov(CollichesnvoStudentov)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Лекции"
                onChangeText={
                  (Lecture) => setLecture(Lecture)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Практические занятия"
                onChangeText={
                  (PracticZanyatie) => setPracticZanyatie(PracticZanyatie)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Лабораторные занятия"
                onChangeText={
                  (LabZanyarie) => setLabZanyarie(LabZanyarie)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Консультации"
                onChangeText={
                  (Konsultacija) => setKonsultacija(Konsultacija)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Экзамены"
                onChangeText={
                  (Examen) => setExamen(Examen)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Зачеты"
                onChangeText={
                  (Zachet) => setZachet(Zachet)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Практика НИР"
                onChangeText={
                  (PracticNIR) => setPracticNIR(PracticNIR)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Курсовой проект"
                onChangeText={
                  (KursovoyProject) => setKursovoyProject(KursovoyProject)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="ВКР"
                onChangeText={
                  (VKR) => setVKR(VKR)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Руководство кафедрой"
                onChangeText={
                  (RukovodstvoKafedra) => setRukovodstvoKafedra(RukovodstvoKafedra)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="ГЭК"
                onChangeText={
                  (GEK) => setGEK(GEK)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Прочее"
                onChangeText={
                  (Prochee) => setProchee(Prochee)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Итого"
                onChangeText={
                  (Itog) => setItog(Itog)
                }
                style={{ padding: 10 }}
              />
              <Mybutton title="Принять" customClick={add_journal} />
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
        }catch{console.log('исключение')}
};

export default AddJournal;