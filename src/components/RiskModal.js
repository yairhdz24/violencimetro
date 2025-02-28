import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Linking } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

const emergencyContacts = {
  low: [
    { name: "Línea de Ayuda Psicológica", phone: "800-123-4567" },
    { name: "Centro de Atención", phone: "555-0123" },
  ],
  medium: [
    { name: "Contacto Familiar 1", phone: "555-1234" },
    { name: "Centro de Apoyo", phone: "800-555-6789" },
  ],
  high: [
    { name: "Policía", phone: "911" },
    { name: "Línea de Emergencia", phone: "066" },
    { name: "Fiscalía", phone: "555-7890" },
  ],
}

const RiskModal = ({ visible, onClose, riskLevel }) => {
  const getContent = () => {
    switch (riskLevel) {
      case "low":
        return {
          title: "Nivel de Riesgo Bajo",
          description: "Te recomendamos buscar ayuda profesional para mejorar tu bienestar emocional.",
          color: "#4CAF50",
          icon: "psychology",
          contacts: emergencyContacts.low,
        }
      case "medium":
        return {
          title: "Nivel de Riesgo Medio",
          description: "Es importante que contactes a tus familiares o personas de confianza.",
          color: "#FFC107",
          icon: "people",
          contacts: emergencyContacts.medium,
        }
      case "high":
        return {
          title: "Nivel de Riesgo Alto",
          description: "¡Tu seguridad es primero! Contacta inmediatamente a las autoridades.",
          color: "#F44336",
          icon: "warning",
          contacts: emergencyContacts.high,
        }
      default:
        return null
    }
  }

  const content = getContent()
  if (!content) return null

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={[styles.header, { backgroundColor: content.color }]}>
            <MaterialIcons name={content.icon} size={32} color="white" />
            <Text style={styles.title}>{content.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body}>
            <Text style={styles.description}>{content.description}</Text>

            <View style={styles.contactsContainer}>
              <Text style={styles.contactsTitle}>Contactos de Emergencia</Text>
              {content.contacts.map((contact, index) => (
                <TouchableOpacity key={index} style={styles.contactButton} onPress={() => handleCall(contact.phone)}>
                  <MaterialIcons name="phone" size={24} color={content.color} />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#666" />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.helpSection}>
              <Text style={styles.helpTitle}>Recursos Adicionales</Text>
              <Text style={styles.helpText}>
                • Busca apoyo en personas de confianza{"\n"}• Mantén un diario de eventos{"\n"}• Prepara un plan de
                seguridad{"\n"}• Guarda documentos importantes{"\n"}• Conoce tus derechos
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={[styles.mainButton, { backgroundColor: content.color }]} onPress={onClose}>
            <Text style={styles.mainButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 12,
  },
  closeButton: {
    padding: 4,
  },
  body: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#454F63",
    lineHeight: 24,
    marginBottom: 20,
  },
  contactsContainer: {
    marginBottom: 20,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 12,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    marginBottom: 8,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#454F63",
  },
  contactPhone: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  helpSection: {
    padding: 16,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  mainButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  mainButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default RiskModal

