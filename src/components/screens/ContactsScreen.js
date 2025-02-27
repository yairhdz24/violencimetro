// src/screens/ContactsScreen.js
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

const emergencyContacts = [
  { id: 1, name: "María (Hermana)", phone: "+34 612 345 678" },
  { id: 2, name: "Centro de Ayuda", phone: "+34 900 123 456" },
  { id: 3, name: "Policía Local", phone: "112" },
];

const ContactsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contactos</Text>
        <TouchableOpacity>
          <MaterialIcons name="add" size={28} color="#5D9CEC" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contactsContainer}>
        <Text style={styles.contactsTitle}>Contactos de Confianza</Text>
        <Text style={styles.contactsDescription}>
          Estos contactos recibirán notificaciones cuando actives la asistencia
          de emergencia
        </Text>
        {emergencyContacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactAvatar}>
              <MaterialIcons name="person" size={28} color="#5D9CEC" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity style={styles.contactEdit}>
              <MaterialIcons name="edit" size={24} color="#7B8D93" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addContactButton}>
          <MaterialIcons name="add" size={24} color="#5D9CEC" />
          <Text style={styles.addContactText}>Agregar contacto</Text>
        </TouchableOpacity>
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
  contactsContainer: { padding: 16 },
  contactsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 8,
  },
  contactsDescription: { fontSize: 14, color: "#7B8D93", marginBottom: 24 },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfo: { flex: 1, marginLeft: 16 },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 4,
  },
  contactPhone: { fontSize: 14, color: "#7B8D93" },
  contactEdit: { padding: 8 },
  addContactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  addContactText: { fontSize: 16, color: "#5D9CEC", marginLeft: 8 },
});

export default ContactsScreen;

