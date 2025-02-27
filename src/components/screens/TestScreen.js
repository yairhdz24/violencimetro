"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, AlertTriangle } from "lucide-react-native";

const { width } = Dimensions.get("window");

// Questions about electoral gender violence
const violenceQuestions = [
  "¿Has recibido comentarios sexistas durante tu participación política?",
  "¿Te han excluido de reuniones importantes por tu género?",
  "¿Has experimentado amenazas relacionadas con tu candidatura o cargo?",
  "¿Han difundido información falsa sobre tu vida personal para desacreditarte?",
  "¿Has recibido mensajes intimidatorios en redes sociales?",
  "¿Han cuestionado tu capacidad para el cargo por ser mujer?",
  "¿Te han negado recursos que a otros candidatos sí les proporcionan?",
  "¿Has sido víctima de violencia verbal en eventos políticos?",
  "¿Han utilizado tu apariencia física para criticar tu trabajo?",
  "¿Has sentido que tu seguridad personal está en riesgo por tu participación política?",
];

const TestScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(violenceQuestions.length).fill(null)
  );
  const [riskLevel, setRiskLevel] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [panicButtonAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    // Panic button pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(panicButtonAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(panicButtonAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [panicButtonAnimation]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Update risk level
    const newRiskLevel = riskLevel + value;
    setRiskLevel(Math.min(newRiskLevel, 10));

    // Move to next question or complete test
    if (currentQuestion < violenceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const getRiskColor = (level) => {
    if (level <= 3) return "#4CAF50"; // Green for low risk
    if (level <= 7) return "#FFC107"; // Yellow for medium risk
    return "#FF3D00"; // Red for high risk
  };

  const getRiskCategory = () => {
    if (riskLevel <= 3) return "Riesgo Bajo";
    if (riskLevel <= 7) return "Riesgo Medio";
    return "Riesgo Alto";
  };

  const getRecommendations = () => {
    if (riskLevel <= 3) {
      return (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationTitle}>Recomendaciones:</Text>
          <Text style={styles.recommendationText}>
            • Mantente informada sobre tus derechos políticos
          </Text>
          <Text style={styles.recommendationText}>
            • Documenta cualquier incidente de violencia política
          </Text>
          <Text style={styles.recommendationText}>
            • Considera buscar apoyo psicológico preventivo
          </Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
            onPress={() => navigation.navigate("Contacts")}>
            <Text style={styles.actionButtonText}>Contactar Asistencia</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (riskLevel <= 7) {
      return (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationTitle}>Recomendaciones:</Text>
          <Text style={styles.recommendationText}>
            • Busca apoyo psicológico especializado
          </Text>
          <Text style={styles.recommendationText}>
            • Informa a personas de confianza sobre tu situación
          </Text>
          <Text style={styles.recommendationText}>
            • Documenta detalladamente todos los incidentes
          </Text>
          <Text style={styles.recommendationText}>
            • Considera reportar los incidentes a las autoridades electorales
          </Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#FFC107" }]}
            onPress={() => navigation.navigate("Contacts")}>
            <Text style={styles.actionButtonText}>Contactar Asistencia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: "#FFC107", marginTop: 10 },
            ]}
            onPress={() => navigation.navigate("Directory")}>
            <Text style={styles.actionButtonText}>Ver Directorio de Apoyo</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationTitle}>Recomendaciones:</Text>
          <Text style={styles.recommendationText}>
            • Busca asistencia inmediata con las autoridades electorales
          </Text>
          <Text style={styles.recommendationText}>
            • Contacta a la Fiscalía Especializada en Delitos Electorales
          </Text>
          <Text style={styles.recommendationText}>
            • Solicita medidas de protección
          </Text>
          <Text style={styles.recommendationText}>
            • Mantén comunicación constante con personas de confianza
          </Text>
          <Text style={styles.recommendationText}>
            • Considera suspender temporalmente actividades de riesgo
          </Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#FF3D00" }]}
            onPress={() => navigation.navigate("Contacts")}>
            <Text style={styles.actionButtonText}>Contactar Emergencia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: "#FF3D00", marginTop: 10 },
            ]}
            onPress={() => navigation.navigate("Directory")}>
            <Text style={styles.actionButtonText}>Iniciar Denuncia</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#8A2387", "#E94057", "#F27121"]}
        style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Evaluación de Riesgo</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {!testCompleted ? (
          <View style={styles.questionContainer}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        (currentQuestion / violenceQuestions.length) * 100
                      }%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                Pregunta {currentQuestion + 1} de {violenceQuestions.length}
              </Text>
            </View>

            <Text style={styles.questionText}>
              {violenceQuestions[currentQuestion]}
            </Text>

            <View style={styles.answerContainer}>
              <TouchableOpacity
                style={[styles.answerButton, { backgroundColor: "#4CAF50" }]}
                onPress={() => handleAnswer(0)}>
                <Text style={styles.answerButtonText}>Nunca</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.answerButton, { backgroundColor: "#8BC34A" }]}
                onPress={() => handleAnswer(1)}>
                <Text style={styles.answerButtonText}>Rara vez</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.answerButton, { backgroundColor: "#FFC107" }]}
                onPress={() => handleAnswer(2)}>
                <Text style={styles.answerButtonText}>A veces</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.answerButton, { backgroundColor: "#FF9800" }]}
                onPress={() => handleAnswer(3)}>
                <Text style={styles.answerButtonText}>Frecuentemente</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.answerButton, { backgroundColor: "#FF3D00" }]}
                onPress={() => handleAnswer(4)}>
                <Text style={styles.answerButtonText}>Constantemente</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <Image
              source={{
                uri: "https://api.a0.dev/assets/image?text=a%20cute%20cartoon%20lion%20mascot%20with%20concerned%20expression&aspect=1:1",
              }}
              style={styles.resultImage}
            />

            <Text
              style={[styles.resultTitle, { color: getRiskColor(riskLevel) }]}>
              {getRiskCategory()}
            </Text>

            <View style={styles.resultMeterContainer}>
              <View style={styles.resultMeterBar}>
                <View
                  style={[
                    styles.resultMeterFill,
                    {
                      width: `${(riskLevel / 10) * 100}%`,
                      backgroundColor: getRiskColor(riskLevel),
                    },
                  ]}
                />
              </View>
              <Text style={styles.resultMeterText}>
                Nivel de riesgo: {riskLevel}/10
              </Text>
            </View>

            {getRecommendations()}

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate("Home")}>
              <Text style={styles.homeButtonText}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Panic Button */}
      <Animated.View
        style={[
          styles.panicButtonContainer,
          {
            transform: [{ scale: panicButtonAnimation }],
          },
        ]}>
        <TouchableOpacity
          style={styles.panicButton}
          onPress={() => navigation.navigate("Emergency")}>
          <AlertTriangle color="#FFF" size={28} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E7FF",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#E94057",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#7B8D93",
    textAlign: "right",
  },
  questionText: {
    fontSize: 18,
    color: "#454F63",
    marginBottom: 24,
    lineHeight: 26,
  },
  answerContainer: {
    width: "100%",
  },
  answerButton: {
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  answerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    alignItems: "center",
  },
  resultImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#E94057",
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  resultMeterContainer: {
    width: "100%",
    marginBottom: 24,
  },
  resultMeterBar: {
    height: 16,
    backgroundColor: "#E0E7FF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  resultMeterFill: {
    height: "100%",
    borderRadius: 8,
  },
  resultMeterText: {
    fontSize: 16,
    textAlign: "center",
    color: "#454F63",
  },
  recommendationsContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 16,
  },
  recommendationText: {
    fontSize: 16,
    color: "#454F63",
    marginBottom: 8,
    lineHeight: 22,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#8A2387",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  panicButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#FF3D00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  panicButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF3D00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TestScreen;
