"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"
import CustomDrawer from "../CustomDrawer"
import RiskMeter from "../RiskMeter"
import RiskModal from "../RiskModal"
import questionsData from "../../../data/questions.json"

const { width } = Dimensions.get("window")

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [currentRiskLevel, setCurrentRiskLevel] = useState(1)
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [modalRiskLevel, setModalRiskLevel] = useState("low")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [riskScores, setRiskScores] = useState([])

  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const translateY = useRef(new Animated.Value(50)).current
  const lionScale = useRef(new Animated.Value(1)).current
  const questionFadeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData.questions).slice(0, 10)
    setQuestions(shuffledQuestions)

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()

    // Sutil animación de "respiración" para el león
    Animated.loop(
      Animated.sequence([
        Animated.timing(lionScale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(lionScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [fadeAnim, scaleAnim, translateY, lionScale])

  const animateQuestionChange = () => {
    Animated.sequence([
      Animated.timing(questionFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(questionFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleRiskLevelChange = (level) => {
    setCurrentRiskLevel(level)
    setRiskScores((prevScores) => [...prevScores, level])

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      animateQuestionChange()
    } else {
      setTestCompleted(true)

      const averageScore = [...riskScores, level].reduce((a, b) => a + b, 0) / questions.length
      if (averageScore <= 3) {
        setModalRiskLevel("low")
      } else if (averageScore <= 7) {
        setModalRiskLevel("medium")
      } else {
        setModalRiskLevel("high")
      }

      setShowRiskModal(true)
    }
  }

  const handleEmergencyCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const handleOpenWebsite = (url) => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      <LinearGradient colors={["#4CAF50", "#388E3C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuButton}>
          <MaterialIcons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Violentómetro</Text>
          <Text style={styles.headerSubtitle}>Evaluación de Riesgo</Text>
        </View>

        <TouchableOpacity style={styles.helpButton}>
          <MaterialIcons name="help-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.mascotContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY }, { scale: lionScale }],
            },
          ]}
        >
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leon%20magistradssss-7g3vCrp4JniaZRtgan4I4oL23AyTHV.png",
            }}
            style={styles.mascotImage}
          />
          <Animated.View style={[styles.messageContainer, { opacity: questionFadeAnim }]}>
            <Text style={styles.messageText}>
              {testCompleted
                ? "¡Gracias por completar el test! Revisa tus resultados a continuación."
                : questions[currentQuestionIndex]}
            </Text>
          </Animated.View>
        </Animated.View>

        {!testCompleted && (
          <View style={styles.meterContainer}>
            <RiskMeter currentLevel={currentRiskLevel} onLevelChange={handleRiskLevelChange} />
          </View>
        )}

        {testCompleted && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultTitle}>Resultado del Test</Text>
            <Text style={styles.resultText}>
              Tu nivel de riesgo es:{" "}
              {modalRiskLevel === "low" ? "Bajo" : modalRiskLevel === "medium" ? "Medio" : "Alto"}
            </Text>
            <TouchableOpacity style={styles.viewDetailsButton} onPress={() => setShowRiskModal(true)}>
              <Text style={styles.viewDetailsButtonText}>Ver Detalles y Recomendaciones</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.helpResourcesContainer}>
          <Text style={styles.sectionTitle}>Recursos de Ayuda</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.resourcesScroll}>
            {[
              {
                icon: "phone",
                title: "Línea de Emergencia",
                color: "#F44336",
                action: () => handleEmergencyCall("911"),
              },
              {
                icon: "users",
                title: "Grupos de Apoyo",
                color: "#4CAF50",
                action: () => handleOpenWebsite("https://www.gruposdeapoyo.org"),
              },
              {
                icon: "book-medical",
                title: "Información",
                color: "#2196F3",
                action: () => handleOpenWebsite("https://www.informacion-violencia.gov"),
              },
            ].map((resource, index) => (
              <TouchableOpacity key={index} style={styles.resourceCard} onPress={resource.action}>
                <LinearGradient colors={[resource.color, shadeColor(resource.color, 20)]} style={styles.resourceIcon}>
                  <FontAwesome5 name={resource.icon} size={24} color="#FFF" />
                </LinearGradient>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <CustomDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navigation={navigation}
        currentScreen="Home"
      />

      <RiskModal
        visible={showRiskModal}
        onClose={() => setShowRiskModal(false)}
        riskLevel={modalRiskLevel}
        onEmergencyCall={handleEmergencyCall}
        onOpenWebsite={handleOpenWebsite}
      />
    </SafeAreaView>
  )
}

// Función auxiliar para oscurecer colores (sin cambios)
const shadeColor = (color, percent) => {
  const num = Number.parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = ((num >> 8) & 0x00ff) - amt
  const B = (num & 0x0000ff) - amt
  return `#${((1 << 24) | ((R < 255 ? (R < 1 ? 0 : R) : 255) << 16) | ((G < 255 ? (G < 1 ? 0 : G) : 255) << 8) | (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  helpButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mascotContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  mascotImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  messageContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    maxWidth: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  messageText: {
    fontSize: 18,
    color: "#454F63",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "500",
  },
  meterContainer: {
    marginVertical: 20,
  },
  resultsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  viewDetailsButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewDetailsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  helpResourcesContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 16,
  },
  resourcesScroll: {
    paddingRight: 16,
  },
  resourceCard: {
    width: width * 0.35,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#454F63",
    textAlign: "center",
  },
})

export default HomeScreen

