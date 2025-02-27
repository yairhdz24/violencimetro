// src/screens/TestScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const questions = [
  {
    id: 1,
    question:
      "¿Con qué frecuencia te sientes controlado/a en tus decisiones diarias?",
    options: ["Nunca", "A veces", "Frecuentemente"],
  },
  {
    id: 2,
    question:
      "¿Has notado cambios significativos en tu bienestar emocional últimamente?",
    options: ["Ninguno", "Algunos", "Muchos"],
  },
  // Agrega más preguntas según necesites
];

const TestScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const riskSum = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const calculatedRisk = Math.round(
        (riskSum / (questions.length * 2)) * 10
      );
      navigation.navigate("Results", { riskLevel: calculatedRisk });
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test de Autoconocimiento</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.testContainer}>
        <View style={styles.progressContainer}>
          {questions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentQuestion
                  ? styles.progressDotActive
                  : index < currentQuestion
                  ? styles.progressDotCompleted
                  : {},
              ]}
            />
          ))}
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>
            Pregunta {currentQuestion + 1} de {questions.length}
          </Text>
          <Text style={styles.questionText}>{currentQ.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerSelect(index)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#454F63" },
  testContainer: { flex: 1, padding: 16 },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 24,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E7FF",
    marginHorizontal: 6,
  },
  progressDotActive: { backgroundColor: "#5D9CEC", width: 24 },
  progressDotCompleted: { backgroundColor: "#4CAF50" },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionNumber: { fontSize: 14, color: "#7B8D93", marginBottom: 8 },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 24,
  },
  optionsContainer: { marginTop: 8 },
  optionButton: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionText: { fontSize: 16, color: "#454F63" },
});

export default TestScreen;
