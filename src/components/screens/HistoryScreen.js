// src/screens/HistoryScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const incidents = [
  {
    id: 1,
    type: "Test completado",
    date: "25/02/2025",
    time: "14:32",
    riskLevel: 3,
  },
  {
    id: 2,
    type: "Alerta SOS",
    date: "20/02/2025",
    time: "22:15",
    riskLevel: 8,
  },
];

const getRiskColor = (level) => {
  if (level <= 3) return "#4CAF50";
  if (level <= 7) return "#FFC107";
  return "#FF5252";
};

const HistoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Apuntes</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {incidents.map((incident) => (
          <View
            key={incident.id}
            style={[
              styles.historyItem,
              { borderLeftColor: getRiskColor(incident.riskLevel) },
            ]}>
            <View style={styles.historyItemHeader}>
              <Text style={styles.historyItemType}>{incident.type}</Text>
              <View style={styles.historyItemTime}>
                <MaterialIcons name="access-time" size={14} color="#7B8D93" />
                <Text style={styles.historyItemTimeText}>
                  {incident.date} - {incident.time}
                </Text>
              </View>
            </View>
            <View style={styles.historyItemContent}>
              {incident.type === "Test completado" ? (
                <View style={styles.historyItemTest}>
                  <Text style={styles.historyItemTestLabel}>Nivel:</Text>
                  <View style={styles.historyItemRiskIndicator}>
                    <View
                      style={[
                        styles.historyItemRiskLevel,
                        {
                          backgroundColor: getRiskColor(incident.riskLevel),
                          width: `${(incident.riskLevel / 10) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.historyItemTestValue}>
                    {incident.riskLevel}/10
                  </Text>
                </View>
              ) : (
                <View style={styles.historyItemSos}>
                  <Text style={styles.historyItemSosLabel}>Duración:</Text>
                  <Text style={styles.historyItemSosValue}>15 minutos</Text>
                  <TouchableOpacity style={styles.historyItemSosPlay}>
                    <MaterialIcons
                      name="play-arrow"
                      size={18}
                      color="#5D9CEC"
                    />
                    <Text style={styles.historyItemSosPlayText}>
                      Reproducir audio
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.historyItemActions}>
              <MaterialIcons name="more-horiz" size={24} color="#7B8D93" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  historyContainer: { padding: 16 },
  historyItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  historyItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyItemType: { fontSize: 16, fontWeight: "bold", color: "#454F63" },
  historyItemTime: { flexDirection: "row", alignItems: "center" },
  historyItemTimeText: { fontSize: 12, color: "#7B8D93", marginLeft: 4 },
  historyItemContent: { marginBottom: 8 },
  historyItemTest: { flexDirection: "row", alignItems: "center" },
  historyItemTestLabel: { fontSize: 14, color: "#7B8D93", marginRight: 8 },
  historyItemRiskIndicator: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E7FF",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
  },
  historyItemRiskLevel: { height: "100%", borderRadius: 4 },
  historyItemTestValue: { fontSize: 14, fontWeight: "bold", color: "#454F63" },
  historyItemSos: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  historyItemSosLabel: { fontSize: 14, color: "#7B8D93", marginRight: 8 },
  historyItemSosValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#454F63",
    marginRight: 16,
  },
  historyItemSosPlay: { flexDirection: "row", alignItems: "center" },
  historyItemSosPlayText: { fontSize: 14, color: "#5D9CEC", marginLeft: 4 },
  historyItemActions: { alignItems: "flex-end" },
});

export default HistoryScreen;
