"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import {
  AlertTriangle,
  MessageCircle,
  BookOpen,
  Phone,
  Home,
  AlertCircle,
  X,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomDrawer from "../CustomDrawer";

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

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [riskLevel, setRiskLevel] = useState(0);
  const [panicActive, setPanicActive] = useState(false);
  const [showPanicButton, setShowPanicButton] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const lionAnimation = useRef(new Animated.Value(0)).current;
  const panicButtonAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Lion animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(lionAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(lionAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

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

    // Show first question after a delay
    const timer = setTimeout(() => {
      setShowQuestionModal(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [lionAnimation, panicButtonAnimation]);

  const translateY = lionAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const activatePanic = () => {
    setPanicActive(true);
    setShowHelpModal(true);
  };

  const deactivatePanic = () => {
    setPanicActive(false);
    setShowHelpModal(false);
  };

  const handleRiskResponse = (level) => {
    // Update risk level based on response (0-2 low, 3-6 medium, 7-10 high)
    const newRiskLevel = riskLevel + level;
    setRiskLevel(Math.min(newRiskLevel, 10));
    setQuestionAnswered(true);

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < violenceQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setQuestionAnswered(false);
      } else {
        setShowQuestionModal(false);
        // Show help based on final risk level
        setShowHelpModal(true);
      }
    }, 1000);
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

  const getHelpContent = () => {
    if (riskLevel <= 3) {
      return (
        <View style={styles.helpContent}>
          <Text style={styles.helpTitle}>Asistencia Psicológica</Text>
          <Text style={styles.helpText}>
            Te recomendamos buscar apoyo psicológico para procesar tu
            experiencia. Recuerda que no estás sola y hay profesionales que
            pueden ayudarte.
          </Text>
          <TouchableOpacity
            style={[styles.helpButton, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.helpButtonText}>Contactar Asistencia</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (riskLevel <= 7) {
      return (
        <View style={styles.helpContent}>
          <Text style={styles.helpTitle}>
            Asistencia Psicológica y Familiar
          </Text>
          <Text style={styles.helpText}>
            Es importante que busques apoyo psicológico y consideres informar a
            un familiar o persona de confianza sobre tu situación para crear una
            red de apoyo.
          </Text>
          <TouchableOpacity
            style={[styles.helpButton, { backgroundColor: "#FFC107" }]}>
            <Text style={styles.helpButtonText}>Contactar Asistencia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.helpButton,
              { backgroundColor: "#FFC107", marginTop: 10 },
            ]}>
            <Text style={styles.helpButtonText}>
              Llamar a Contacto de Emergencia
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.helpContent}>
          <Text style={styles.helpTitle}>Asistencia Inmediata</Text>
          <Text style={styles.helpText}>
            Tu situación requiere atención inmediata. Te proporcionamos
            información para presentar una denuncia formal y acceder a medidas
            de protección.
          </Text>
          <TouchableOpacity
            style={[styles.helpButton, { backgroundColor: "#FF3D00" }]}>
            <Text style={styles.helpButtonText}>
              Contactar Asistencia de Emergencia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.helpButton,
              { backgroundColor: "#FF3D00", marginTop: 10 },
            ]}>
            <Text style={styles.helpButtonText}>Iniciar Denuncia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.helpButton,
              { backgroundColor: "#FF3D00", marginTop: 10 },
            ]}>
            <Text style={styles.helpButtonText}>Medidas de Protección</Text>
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
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Violentómetro</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.homeContent}>
        <Animated.View
          style={[styles.lionContainer, { transform: [{ translateY }] }]}>
          <Image
            source={{
              uri: "https://api.a0.dev/assets/image?text=a%20cute%20cartoon%20lion%20mascot%20with%20friendly%20expression&aspect=1:1",
            }}
            style={styles.lionImage}
          />
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>
              ¡Hola! Soy Leo, tu asistente contra la violencia política de
              género.{"\n"}
              Te haré algunas preguntas para evaluar tu situación.
            </Text>
          </View>
        </Animated.View>

        <View style={styles.riskMeterContainer}>
          <Text style={styles.riskMeterTitle}>Nivel de Riesgo</Text>
          <View style={styles.riskMeterBar}>
            <View
              style={[
                styles.riskMeterFill,
                {
                  width: `${(riskLevel / 10) * 100}%`,
                  backgroundColor: getRiskColor(riskLevel),
                },
              ]}
            />
          </View>
          <View style={styles.riskLabels}>
            <Text style={styles.riskLabelLow}>Bajo Riesgo</Text>
            <Text style={styles.riskLabelMedium}>Riesgo Medio</Text>
            <Text style={styles.riskLabelHigh}>Alto Riesgo</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.startTestButton,
            { backgroundColor: panicActive ? "#FF3D00" : "#E94057" },
          ]}
          onPress={() => setShowQuestionModal(true)}>
          <Text style={styles.startTestButtonText}>
            {questionAnswered ? "Continuar Evaluación" : "Iniciar Evaluación"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => {}}>
          <Home color="#E94057" size={24} />
          <Text style={styles.tabText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Forum")}>
          <MessageCircle color="#8A2387" size={24} />
          <Text style={styles.tabText}>Foro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Directory")}>
          <BookOpen color="#8A2387" size={24} />
          <Text style={styles.tabText}>Directorio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Contacts")}>
          <Phone color="#8A2387" size={24} />
          <Text style={styles.tabText}>Contactos</Text>
        </TouchableOpacity>
      </View>

      {/* Panic Button */}
      {showPanicButton && (
        <Animated.View
          style={[
            styles.panicButtonContainer,
            {
              transform: [{ scale: panicButtonAnimation }],
            },
          ]}>
          <TouchableOpacity style={styles.panicButton} onPress={activatePanic}>
            <AlertTriangle color="#FFF" size={28} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Question Modal */}
      <Modal
        visible={showQuestionModal}
        transparent={true}
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.questionModal}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                Pregunta {currentQuestion + 1}/{violenceQuestions.length}
              </Text>
              <TouchableOpacity onPress={() => setShowQuestionModal(false)}>
                <X color="#8A2387" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.questionText}>
              {violenceQuestions[currentQuestion]}
            </Text>

            <View style={styles.riskButtonsContainer}>
              <TouchableOpacity
                style={[styles.riskButton, { backgroundColor: "#4CAF50" }]}
                onPress={() => handleRiskResponse(0)}>
                <Text style={styles.riskButtonText}>Nunca</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.riskButton, { backgroundColor: "#8BC34A" }]}
                onPress={() => handleRiskResponse(1)}>
                <Text style={styles.riskButtonText}>Rara vez</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.riskButton, { backgroundColor: "#FFC107" }]}
                onPress={() => handleRiskResponse(2)}>
                <Text style={styles.riskButtonText}>A veces</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.riskButton, { backgroundColor: "#FF9800" }]}
                onPress={() => handleRiskResponse(3)}>
                <Text style={styles.riskButtonText}>Frecuentemente</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.riskButton, { backgroundColor: "#FF3D00" }]}
                onPress={() => handleRiskResponse(4)}>
                <Text style={styles.riskButtonText}>Constantemente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Help Modal */}
      <Modal visible={showHelpModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.helpModal}>
            <View style={styles.helpHeader}>
              <Text
                style={[
                  styles.helpHeaderText,
                  { color: getRiskColor(riskLevel) },
                ]}>
                {getRiskCategory()}
              </Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <X color="#8A2387" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.helpRiskMeter}>
              <View style={styles.riskMeterBar}>
                <View
                  style={[
                    styles.riskMeterFill,
                    {
                      width: `${(riskLevel / 10) * 100}%`,
                      backgroundColor: getRiskColor(riskLevel),
                    },
                  ]}
                />
              </View>
              <Text style={styles.helpRiskText}>
                Nivel de riesgo: {riskLevel}/10
              </Text>
            </View>

            {getHelpContent()}

            {panicActive && (
              <View style={styles.panicActiveSection}>
                <AlertCircle color="#FF3D00" size={24} />
                <Text style={styles.panicActiveText}>
                  Alerta de pánico activada
                </Text>
                <TouchableOpacity
                  style={styles.deactivateButton}
                  onPress={deactivatePanic}>
                  <Text style={styles.deactivateButtonText}>Desactivar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <CustomDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navigation={navigation}
        currentScreen="Home"
      />
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
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    width: 28,
    height: 20,
    justifyContent: "space-between",
  },
  menuLine: {
    width: "100%",
    height: 3,
    backgroundColor: "white",
    borderRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  homeContent: {
    padding: 16,
    alignItems: "center",
    paddingBottom: 80,
  },
  lionContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  lionImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#E94057",
  },
  chatBubble: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    maxWidth: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  chatText: {
    fontSize: 16,
    color: "#454F63",
    lineHeight: 22,
    textAlign: "center",
  },
  riskMeterContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  riskMeterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 12,
    textAlign: "center",
  },
  riskMeterBar: {
    height: 16,
    backgroundColor: "#E0E7FF",
    borderRadius: 8,
    overflow: "hidden",
  },
  riskMeterFill: {
    height: "100%",
    borderRadius: 8,
  },
  riskLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  riskLabelLow: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  riskLabelMedium: {
    fontSize: 14,
    color: "#FFC107",
    fontWeight: "bold",
  },
  riskLabelHigh: {
    fontSize: 14,
    color: "#FF3D00",
    fontWeight: "bold",
  },
  startTestButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: "#E94057",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
  },
  startTestButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: "#8A2387",
  },
  panicButtonContainer: {
    position: "absolute",
    bottom: 80,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8A2387",
  },
  questionText: {
    fontSize: 18,
    color: "#454F63",
    marginBottom: 24,
    lineHeight: 26,
  },
  riskButtonsContainer: {
    width: "100%",
  },
  riskButton: {
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  riskButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  helpModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 500,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  helpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  helpHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  helpRiskMeter: {
    marginBottom: 20,
  },
  helpRiskText: {
    fontSize: 16,
    marginTop: 8,
    color: "#454F63",
    textAlign: "center",
  },
  helpContent: {
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 16,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 12,
  },
  helpText: {
    fontSize: 16,
    color: "#454F63",
    lineHeight: 24,
    marginBottom: 16,
  },
  helpButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  helpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  panicActiveSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  panicActiveText: {
    color: "#FF3D00",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
  },
  deactivateButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF3D00",
  },
  deactivateButtonText: {
    color: "#FF3D00",
    fontWeight: "bold",
  },
});

export default HomeScreen;
