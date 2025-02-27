// src/screens/CalculatorScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const CalculatorScreen = ({ navigation }) => {
  const [display, setDisplay] = useState("0");

  const handleKeyPress = (key) => {
    if (key === "C") {
      setDisplay("0");
      navigation.navigate("Home");
    } else {
      setDisplay(display === "0" ? key : display + key);
    }
  };

  const keys = [
    "C",
    "±",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculatorContainer}>
        <View style={styles.calculatorDisplay}>
          <Text style={styles.calculatorResult}>{display}</Text>
        </View>
        <View style={styles.calculatorKeypad}>
          {keys.map((key, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calculatorKey,
                isNaN(parseInt(key)) && key !== "." && key !== "0"
                  ? styles.calculatorKeyOperator
                  : {},
                key === "0" ? styles.calculatorKeyZero : {},
                key === "=" ? styles.calculatorKeyEquals : {},
              ]}
              onPress={() => handleKeyPress(key)}>
              <Text
                style={[
                  styles.calculatorKeyText,
                  isNaN(parseInt(key)) && key !== "."
                    ? styles.calculatorKeyTextOperator
                    : {},
                ]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  calculatorContainer: { flex: 1 },
  calculatorDisplay: {
    backgroundColor: "#454F63",
    padding: 24,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  calculatorResult: { fontSize: 48, color: "white" },
  calculatorKeypad: { flexDirection: "row", flexWrap: "wrap" },
  calculatorKey: {
    width: "25%",
    height: (height - 200) / 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#F5F7FA",
  },
  calculatorKeyOperator: { backgroundColor: "#5D9CEC" },
  calculatorKeyZero: { width: "50%" },
  calculatorKeyEquals: { backgroundColor: "#FF5252" },
  calculatorKeyText: { fontSize: 24, color: "#454F63" },
  calculatorKeyTextOperator: { color: "white" },
});

export default CalculatorScreen;
