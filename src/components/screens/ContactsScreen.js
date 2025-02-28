import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Colores principales de la app
const COLORS = {
  primary: "#1f4035",
  white: "#FFFFFF",
  background: "#F5F7FA",
  text: "#2D3748",
  textLight: "#718096",
  border: "rgba(31, 64, 53, 0.1)",
};

const emergencyContacts = [
  { id: 1, name: "Yair (Hermano)", phone: "+52 33 1765 9254" },
  { id: 2, name: "Centro de Ayuda", phone: "+34 900 123 456" },
  { id: 3, name: "Policía Local", phone: "112" },
];

const ContactsScreen = ({ navigation }) => {
  // Función para realizar la llamada
  const callContact = (phone) => {
    Linking.openURL(`tel:${phone}`).catch((err) =>
      console.error("Error al intentar llamar:", err)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Home")}
          style={styles.headerButton}
        >
          <MaterialIcons name="arrow-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contactos</Text>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="add" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.contactsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.contactsTitle}>Contactos de Confianza</Text>
        <Text style={styles.contactsDescription}>
          Estos contactos recibirán notificaciones cuando actives la asistencia de emergencia
        </Text>

        {emergencyContacts.map((contact) => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactCard}
            activeOpacity={0.7}
            onPress={() => callContact(contact.phone)}
          >
            <View style={styles.contactAvatar}>
              <MaterialIcons name="person" size={28} color={COLORS.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity 
              style={styles.contactEdit}
              activeOpacity={0.7}
              // Aquí puedes agregar onPress para editar si lo requieres
            >
              <MaterialIcons name="edit" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.addContactButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="add-circle-outline" size={24} color={COLORS.primary} />
          <Text style={styles.addContactText}>Agregar contacto</Text>
        </TouchableOpacity>

        {/* Información adicional */}
        <View style={styles.infoSection}>
          <MaterialIcons 
            name="info-outline" 
            size={20} 
            color={COLORS.textLight} 
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Puedes agregar hasta 5 contactos de confianza para recibir alertas de emergencia
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: COLORS.white,
  },
  contactsContainer: { 
    padding: 16,
    paddingBottom: 32,
  },
  contactsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 8,
  },
  contactsDescription: { 
    fontSize: 14, 
    color: COLORS.textLight, 
    marginBottom: 24,
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfo: { 
    flex: 1, 
    marginLeft: 16 
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  contactPhone: { 
    fontSize: 14, 
    color: COLORS.textLight 
  },
  contactEdit: { 
    padding: 8,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 8,
  },
  addContactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addContactText: { 
    fontSize: 16, 
    color: COLORS.primary, 
    marginLeft: 8,
    fontWeight: "600",
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: `${COLORS.primary}08`,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
});

export default ContactsScreen;
