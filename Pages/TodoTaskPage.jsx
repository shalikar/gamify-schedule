import React, { useState, useEffect } from "react";
import { Button, TextInput, Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import CustomerService from "../services/CustomerService";
import { Picker } from "@react-native-community/picker";
import { DatePickerModal } from "react-native-paper-dates";
import { TimePickerModal } from "react-native-paper-dates";
import Moment from "moment";
import "intl";
import "intl/locale-data/jsonp/en";

export default function TodoTaskPage(props) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [showDate, setShowDate] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("");

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      console.log(params.date);
      setShowDate(true);
    },
    [setOpen, setDate]
  );
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setHours(hours);
      setMinutes(minutes);
      setShowTime(true);
    },
    [setVisible]
  );

  const loadTasks = async () => {
    const data = await CustomerService.getTodoTask(props.route.params?.taskId);
    if (data) {
      setId(data.id);
      setTitle(data.title);
      setDescription(data.description);
      setHours(data.hours);
      setMinutes(data.minues);
      setDifficulty(data.difficulty);
    }
  };

  useEffect(() => {
    loadTasks();
    // notify();
  }, []);

  const saveTask = async () => {
    await CustomerService.saveTodoTask({
      id: id,
      title: title,
      description: description,
      date: date,
      hours: hours,
      minues: minutes,
      difficulty: difficulty
    });
    props.navigation.navigate("Home", {
      screen: "Todo",
      params: { action: "task added" },
    });
  };

  const deleteTask = async () => {
    const res = await CustomerService.deleteTodoTask(
      props.route.params?.taskId
    );
    props.navigation.navigate("Home", {
      screen: "Todo",
      params: { action: "task added" },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          label="Title"
          value={title}
          textContentType="jobTitle"
          onChangeText={(title) => setTitle(title)}
        />
      </View>
      <View style={styles.field}>
        <TextInput
          label="Description"
          value={description}
          textContentType="fullStreetAddress"
          onChangeText={(description) => setDescription(description)}
        />
      </View>

      <Title style={{ fontSize: 17, marginTop: 20 }}>Due date and time</Title>
        <View style={styles.picker}>
          <View>
              <Button mode="outlined" style={{ width: 140 }} onPress={() => setOpen(true)} style={styles.dateButton}>
                  {
                    date
                      ? Moment(date).format("MM-DD-YYYY")
                      : Moment().format("MM-DD-YYYY")
                  }
              </Button>
            <DatePickerModal
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle}
              validRange={{
                startDate: new Date(),
              }}
            />
          </View>
          <View>
              <Button mode="outlined" style={{ width: 140 }} on onPress={() => setVisible(true)}>
                  {
                    hours && minutes
                      ? hours + ":" + minutes
                      : Moment().format("HH:mm")
                  }
              </Button>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              // hours={12} // default: current hours
              // minutes={14} // default: current minutes
              animationType="fade"
              locale={"en"}
            />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Title style={{ fontSize: 17 }}>Difficulty</Title>
          <Picker
            selectedValue={difficulty}
            onValueChange={(difficulty) => setDifficulty(difficulty)}
            style={{ width: 100, marginLeft: 20 }}
            mode="dropdown"
          >
            <Picker.Item label="Easy" value="Easy" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Hard" value="Hard" />
          </Picker>
        </View>

      <View style={styles.buttonParent}>
        <View style={styles.btn1}>
          <Button mode="contained" onPress={deleteTask}>
            {props.route.params?.taskId ? "Delete" : "Cancel"}
          </Button>
        </View>
        <View style={styles.btn2}>
          <Button mode="contained" onPress={saveTask}>
            Save
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 30,
    marginTop: 20,
    justifyContent: "center",
  },
  field: {
    marginBottom: 10,
  },
  buttonParent: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  btn1: {
    display: "flex",
    alignItems: "center",
    marginRight: 100,
  },
  btn2: {
    display: "flex",
    alignItems: "center",
  },
  dateButton: {
    width: 150,
  },
  timeButton: {
    width: 150,
    alignItems: "center",
  },
  menuItem: {
    height: 25,
  },
  picker: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
