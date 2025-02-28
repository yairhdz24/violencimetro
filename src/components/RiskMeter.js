import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const RiskMeter = ({ currentLevel, onLevelChange, questionNumber }) => {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Animaciones para las bolitas
  const scaleAnims = useRef(levels.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    if (currentLevel > 0) {
      // Animar la bolita seleccionada
      Animated.sequence([
        Animated.timing(scaleAnims[currentLevel - 1], {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[currentLevel - 1], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [currentLevel]);

  const getRiskColor = (level) => {
    if (level <= 3) return "#4CAF50"; // Verde para riesgo bajo
    if (level <= 7) return "#FFC107"; // Amarillo para riesgo medio
    return "#FF3D00"; // Rojo para riesgo alto
  };

  const getRiskIcon = (level) => {
    if (level <= 3) return "sentiment-satisfied";
    if (level <= 7) return "sentiment-neutral";
    return "sentiment-very-dissatisfied";
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con número de pregunta y progreso */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#1f4035", "#1f4035"]}
          style={styles.questionBadge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Text style={styles.questionNumber}>
            Pregunta {questionNumber} de 10
          </Text>
        </LinearGradient>
        {/* Línea de tiempo con bolitas */}
        <View style={styles.timelineContainer}>
          {[1, 2, 3, 4, 5,].map((step) => (
            <View key={step} style={styles.timelineStep}>
              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor:
                      step <= questionNumber ? "#1f4035" : "#E0E0E0",
                  },
                ]}
              />
              {step < 5 && (
                <View
                  style={[
                    styles.timelineLine,
                    {
                      backgroundColor:
                        step < questionNumber ? "#4CAF50" : "#E0E0E0",
                    },
                  ]}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Contenedor principal del medidor */}
      <LinearGradient
        colors={["#FFFFFF", "#F5F7FA"]}
        style={styles.meterContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <Text style={styles.meterTitle}>Selecciona el nivel de riesgo</Text>
        {/* Línea de tiempo de niveles de riesgo */}
        <View style={styles.riskTimelineContainer}>
          <View style={styles.riskTimelineLine} />
          {/* Bolitas de niveles de riesgo */}
          <View style={styles.riskDotsContainer}>
            {levels.map((level) => (
              <Animated.View
                key={level}
                style={[
                  styles.riskDotWrapper,
                  { transform: [{ scale: scaleAnims[level - 1] }] },
                ]}>
                <TouchableOpacity
                  style={[
                    styles.riskDot,
                    {
                      backgroundColor:
                        level === currentLevel
                          ? getRiskColor(level)
                          : "#F5F7FA",
                      borderColor: getRiskColor(level),
                    },
                  ]}
                  onPress={() => onLevelChange(level)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.riskDotText,
                      { color: level === currentLevel ? "#FFFFFF" : "#454F63" },
                    ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
                {level === currentLevel && (
                  <View
                    style={[
                      styles.selectedIndicator,
                      { backgroundColor: getRiskColor(level) },
                    ]}
                  />
                )}
              </Animated.View>
            ))}
          </View>
          {/* Etiquetas de riesgo */}
          <View style={styles.riskLabelsContainer}>
            <View style={styles.riskLabelSection}>
              <MaterialIcons
                name="sentiment-satisfied"
                size={20}
                color="#4CAF50"
              />
              <Text style={[styles.riskLabel, { color: "#4CAF50" }]}>Bajo</Text>
            </View>
            <View style={styles.riskLabelSection}>
              <MaterialIcons
                name="sentiment-neutral"
                size={20}
                color="#FFC107"
              />
              <Text style={[styles.riskLabel, { color: "#FFC107" }]}>
                Medio
              </Text>
            </View>
            <View style={styles.riskLabelSection}>
              <MaterialIcons
                name="sentiment-very-dissatisfied"
                size={20}
                color="#FF3D00"
              />
              <Text style={[styles.riskLabel, { color: "#FF3D00" }]}>Alto</Text>
            </View>
          </View>
        </View>

        {/* Descripción del nivel seleccionado */}
        {/* {currentLevel > 0 && (
          <View style={[styles.selectedLevelInfo, { borderColor: getRiskColor(currentLevel) }]}>
            <MaterialIcons name={getRiskIcon(currentLevel)} size={24} color={getRiskColor(currentLevel)} />
            <Text style={[styles.selectedLevelText, { color: getRiskColor(currentLevel) }]}>
              Nivel {currentLevel}: {currentLevel <= 3 ? "Riesgo Bajo" : currentLevel <= 7 ? "Riesgo Medio" : "Riesgo Alto"}
            </Text>
          </View>
        )} */}

        {/* Botón para confirmar selección */}
        {currentLevel > 0 && (
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: getRiskColor(currentLevel) },
            ]}
            onPress={() => onLevelChange(currentLevel)}>
            <Text style={styles.confirmButtonText}>Confirmar selección</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  headerContainer: { width: "100%", marginBottom: 15 },
  questionBadge: {
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  questionNumber: { fontSize: 14, fontWeight: "bold", color: "white" },
  timelineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  timelineStep: { flexDirection: "row", alignItems: "center" },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1f4035",
    zIndex: 1,
  },
  timelineLine: {
    height: 3,
    width: (width - 120) / 4,
    backgroundColor: "#E0E0E0",
  },
  meterContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  meterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f4035",
    textAlign: "center",
    marginBottom: 20,
  },
  riskTimelineContainer: { marginVertical: 15 },

  riskDotsContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  riskDotWrapper: { alignItems: "center" },
  riskDot: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#F5F7FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 1,
  },
  riskDotText: { fontSize: 16, fontWeight: "bold" },
  selectedIndicator: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  riskLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  riskLabelSection: { alignItems: "center", flex: 1 },
  riskLabel: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  selectedLevelInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginVertical: 15,
  },
  selectedLevelText: { fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default RiskMeter;
