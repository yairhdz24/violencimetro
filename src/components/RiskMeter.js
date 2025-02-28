"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const sliderWidth = 300
const maxLevel = 10
const knobSize = 30
const levelWidth = sliderWidth / maxLevel

const riskLevels = [
  { color: "#4CAF50", label: "Bajo", range: [1, 3] },
  { color: "#FFC107", label: "Medio", range: [4, 7] },
  { color: "#FF3D00", label: "Alto", range: [8, 10] },
]

const RiskMeter = ({ currentLevel, onLevelChange }) => {
  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: 0 })
      },
      onPanResponderMove: (_, gesture) => {
        const newX = Math.max(0, Math.min(gesture.dx + pan.x._offset, sliderWidth - knobSize))
        pan.x.setValue(newX)
        const newLevel = Math.max(1, Math.min(Math.round(newX / levelWidth) + 1, maxLevel))
        onLevelChange(newLevel)
      },
      onPanResponderRelease: () => {
        pan.flattenOffset()
      },
    }),
  ).current

  useEffect(() => {
    pan.x.setValue((currentLevel - 1) * levelWidth)
  }, [currentLevel, pan.x])

  const getRiskLevel = () => {
    return riskLevels.find((level) => currentLevel >= level.range[0] && currentLevel <= level.range[1]) || riskLevels[0]
  }

  const riskLevel = getRiskLevel()

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="gauge" size={24} color="#454F63" />
        <Text style={styles.title}>Nivel de Riesgo</Text>
        <Text style={[styles.levelText, { color: riskLevel.color }]}>{riskLevel.label}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.track}>
          {riskLevels.map((level, index) => (
            <View
              key={index}
              style={[styles.trackSection, { backgroundColor: level.color, flex: level.range[1] - level.range[0] + 1 }]}
            />
          ))}
        </View>
        <Animated.View
          style={[styles.knob, { transform: [{ translateX: pan.x }], backgroundColor: riskLevel.color }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.knobText}>{currentLevel}</Text>
        </Animated.View>
        <View style={styles.numberContainer}>
          {[...Array(maxLevel)].map((_, index) => (
            <Text key={index} style={styles.numberText}>
              {index + 1}
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    flex: 1,
    marginLeft: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    alignItems: "center",
  },
  track: {
    height: 10,
    width: sliderWidth,
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  trackSection: {
    height: "100%",
  },
  knob: {
    width: knobSize,
    height: knobSize,
    borderRadius: knobSize / 2,
    position: "absolute",
    top: -10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  knobText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: sliderWidth,
    marginTop: 10,
  },
  numberText: {
    fontSize: 12,
    color: "#666",
  },
})

export default RiskMeter

