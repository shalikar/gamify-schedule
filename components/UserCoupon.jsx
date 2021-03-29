import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";

export default function UserCoupon(props) {
  return (
    <View style={styles.container}>
      <List.Item
        title={props.title}
        description={props.description}
        right={(props) => (
          <View>
            <Text
              style={styles.text}
              onPress={() => Alert.alert("GET pressed")}
            >
              GET
            </Text>
            <Text>{props.description} points</Text>
          </View>
        )}
        style={styles.listItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  listItem: {
    // backgroundColor: "lightblue",
  },
  text: {
    fontWeight: "bold",
    padding: 10,
  },
});
