import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView, Text } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'JournalDatabase.db' });

const Update_J = ({ navigation }) => {
  let [inputJournalId, setInputJournalId] = useState('');
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

  let updateAllStates = (Date, ChasyZanatiy, Fakultet, Curse, Group, CollichesnvoStudentov, Lecture, PracticZanyatie, LabZanyarie, Konsultacija, Examen, Zachet, PracticNIR, KursovoyProject, VKR, RukovodstvoKafedra, GEK, Prochee, Itog) => {
    setDate(Date);
    setChasyZanatiy(ChasyZanatiy);
    setFakultet(Fakultet);
    setCurse(Curse);
    setGroup(Group);
    setCollichesnvoStudentov(CollichesnvoStudentov);
    setLecture(Lecture);
    setPracticZanyatie(PracticZanyatie);
    setLabZanyarie(LabZanyarie);
    setKonsultacija(Konsultacija);
    setExamen(Examen);
    setZachet(Zachet);
    setPracticNIR(PracticNIR);
    setKursovoyProject(KursovoyProject);
    setVKR(VKR);
    setRukovodstvoKafedra(RukovodstvoKafedra);
    setGEK(GEK);
    setProchee(Prochee);
    setItog(Itog);
  };

  let searchJournal = () => {
    console.log(inputJournalId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_journal where journal_id = ?',
        [inputJournalId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.Date,
              res.ChasyZanatiy,
              res.Fakultet,
              res.Curse,
              res.Group,
              res.CollichesnvoStudentov,
              res.Lecture,
              res.PracticZanyatie,
              res.LabZanyarie,
              res.Konsultacija,
              res.Examen,
              res.Zachet,
              res.PracticNIR,
              res.KursovoyProject,
              res.VKR,
              res.RukovodstvoKafedra,
              res.GEK,
              res.Prochee,
              res.Itog
            );
          } else {
            alert('Запись не найдена');
            updateAllStates('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          }
        }
      );
    });
  };
  let Update_J = () => {
    console.log(inputJournalId, Date, ChasyZanatiy, Fakultet, Curse, Group, CollichesnvoStudentov, Lecture, PracticZanyatie, LabZanyarie, Konsultacija, Examen, Zachet, PracticNIR, KursovoyProject, VKR, RukovodstvoKafedra, GEK, Prochee, Itog);

    if (!inputJournalId) {
      alert('Введите id записи');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_journal set Date=?, ChasyZanatiy=?, Fakultet=?, Curse=?, Group=?, CollichesnvoStudentov=?, Lecture=?, PracticZanyatie=?, LabZanyarie=?, Konsultacija=?, Examen=?, Zachet=?, PracticNIR=?, KursovoyProject=?, VKR=?, RukovodstvoKafedra=?, GEK=?, Prochee=?, Itog=? where journal_id=?',
        [Date, ChasyZanatiy, Fakultet, Curse, Group, CollichesnvoStudentov, Lecture, PracticZanyatie, LabZanyarie, Konsultacija, Examen, Zachet, PracticNIR, KursovoyProject, VKR, RukovodstvoKafedra, GEK, Prochee, Itog, inputJournalId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Успешно',
              'Данные обновлены',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Journal'),
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
                  (inputJournalId) => setinputJournalId(inputJournalId)
                }
              />
              <Mybutton
                title="Поиск"
                customClick={searchJournal} 
              />
              <Mytextinput
                placeholder="Дата"
                value={Date}
                style={{ padding: 10 }}
                onChangeText={
                  (Date) => setDate(Date)
                }
              />
              <Mytextinput
                placeholder="Часы занятий"
                value={ChasyZanatiy }
                style={{ padding: 10 }}
                onChangeText={
                  (ChasyZanatiy ) => setChasyZanatiy(ChasyZanatiy )
                }
              />
              <Mytextinput
                placeholder="Факультет"
                value={Fakultet}
                style={{ padding: 10 }}
                onChangeText={
                  (Fakultet) => setFakultet(Fakultet)
                }
              />
              <Mytextinput
                placeholder="Курс"
                value={Curse}
                style={{ padding: 10 }}
                onChangeText={
                  (Curse) => setCurse(Curse)
                }
              />
              <Mytextinput
                placeholder="Группа"
                value={Group}
                style={{ padding: 10 }}
                onChangeText={
                  (Group) => setGroup(Group)
                }
              />
              <Mytextinput
                placeholder="Колличество студентов"
                value={CollichesnvoStudentov}
                style={{ padding: 10 }}
                onChangeText={
                  (CollichesnvoStudentov) => setCollichesnvoStudentov(CollichesnvoStudentov)
                }
              />
              <Mytextinput
                placeholder="Лекции"
                value={Lecture}
                style={{ padding: 10 }}
                onChangeText={
                  (Lecture) => setLecture(Lecture)
                }
              />
              <Mytextinput
                placeholder="Практические занятия"
                value={PracticZanyatie}
                style={{ padding: 10 }}
                onChangeText={
                  (PracticZanyatie) => setPracticZanyatie(PracticZanyatie)
                }
              />
              <Mytextinput
                placeholder="Лаборатнорные занятия"
                value={LabZanyarie}
                style={{ padding: 10 }}
                onChangeText={
                  (LabZanyarie) => setLabZanyarie(LabZanyarie)
                }
              />
              <Mytextinput
                placeholder="Консультации"
                value={Konsultacija}
                style={{ padding: 10 }}
                onChangeText={
                  (Konsultacija) => setKonsultacija(Konsultacija)
                }
              />
              <Mytextinput
                placeholder="Экзамены"
                value={Examen}
                style={{ padding: 10 }}
                onChangeText={
                  (Examen) => setExamen(Examen)
                }
              />
              <Mytextinput
                placeholder="Зачеты"
                value={Zachet}
                style={{ padding: 10 }}
                onChangeText={
                  (Zachet) => setZachet(Zachet)
                }
              />
              <Mytextinput
                placeholder="Практики НИР"
                value={PracticNIR}
                style={{ padding: 10 }}
                onChangeText={
                  (PracticNIR) => setPracticNIR(PracticNIR)
                }
              />
              <Mytextinput
                placeholder="Курсовые проекты"
                value={KursovoyProject}
                style={{ padding: 10 }}
                onChangeText={
                  (KursovoyProject) => setKursovoyProject(KursovoyProject)
                }
              />
              <Mytextinput
                placeholder="ВКР"
                value={VKR}
                style={{ padding: 10 }}
                onChangeText={
                  (VKR) => setVKR(VKR)
                }
              />
              <Mytextinput
                placeholder="Руководство кафедра"
                value={RukovodstvoKafedra}
                style={{ padding: 10 }}
                onChangeText={
                  (RukovodstvoKafedra) => setRukovodstvoKafedra(RukovodstvoKafedra)
                }
              />
              <Mytextinput
                placeholder="ГЭК"
                value={GEK}
                style={{ padding: 10 }}
                onChangeText={
                  (GEK) => setGEK(GEK)
                }
              />
              <Mytextinput
                placeholder="Прочее"
                value={Prochee}
                style={{ padding: 10 }}
                onChangeText={
                  (Prochee) => setProchee(Prochee)
                }
              />
              <Mytextinput
                placeholder="Итого"
                value={Itog}
                style={{ padding: 10 }}
                onChangeText={
                  (Itog) => setItog(Itog)
                }
              />
              <Mybutton
                title="Обновить"
                customClick={Update_J}
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

export default Update_J;