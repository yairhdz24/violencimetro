import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native"
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const emergencyContacts = {
  low: [
    { name: "Línea de Ayuda Psicológica", phone: "800-123-4567", icon: "psychology" },
    { name: "Centro de Atención", phone: "555-0123", icon: "local-hospital" },
  ],
  medium: [
    { name: "Contacto Familiar 1", phone: "555-1234", icon: "family-restroom" },
    { name: "Centro de Apoyo", phone: "800-555-6789", icon: "support-agent" },
  ],
  high: [
    { name: "Policía", phone: "911", icon: "local-police" },
    { name: "Línea de Emergencia", phone: "066", icon: "emergency" },
    { name: "Fiscalía", phone: "555-7890", icon: "gavel" },
  ],
}

const RiskModal = ({ visible, onClose, riskLevel, onEmergencyCall, onOpenWebsite }) => {
  const getContent = () => {
    switch (riskLevel) {
      case "low":
        return {
          title: "Nivel de Riesgo Bajo",
          description: "Te recomendamos buscar ayuda profesional para mejorar tu bienestar emocional.",
          color: "#4CAF50",
          icon: "sentiment-satisfied",
          contacts: emergencyContacts.low,
        }
      case "medium":
        return {
          title: "Nivel de Riesgo Medio",
          description: "Es importante que contactes a tus familiares o personas de confianza.",
          color: "#FFC107",
          icon: "sentiment-neutral",
          contacts: emergencyContacts.medium,
        }
      case "high":
        return {
          title: "Nivel de Riesgo Alto",
          description: "¡Tu seguridad es primero! Contacta inmediatamente a las autoridades.",
          color: "#F44336",
          icon: "sentiment-very-dissatisfied",
          contacts: emergencyContacts.high,
        }
      default:
        return null
    }
  }

  const content = getContent()
  if (!content) return null

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient colors={[content.color, shadeColor(content.color, -20)]} style={styles.header}>
            <MaterialIcons name={content.icon} size={32} color="white" />
            <Text style={styles.title}>{content.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.body}>
            <Text style={styles.description}>{content.description}</Text>

            <View style={styles.contactsContainer}>
              <Text style={styles.contactsTitle}>Contactos de Emergencia</Text>
              {content.contacts.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.contactButton}
                  onPress={() => onEmergencyCall(contact.phone)}
                >
                  <MaterialIcons name={contact.icon} size={24} color={content.color} />
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
                • Busca apoyo en personas de confianza{"\n"}• Mantén un diario de eventos{"\n"}• Prepara un plan de seguridad{"\n"}• Guarda documentos importantes{"\n"}• Conoce tus derechos
              </Text>
            </View>

            {riskLevel === "high" && (
              <TouchableOpacity
                style={styles.reportButton}
                onPress={() => onOpenWebsite("https://igualdad.ine.mx/wp-content/uploads/2020/12/Formulario_Formato_de_Denuncia_VPCMRG_listo.pdf")}
              >
                <FontAwesome5 name="file-alt" size={20} color="white" />
                <Text style={styles.reportButtonText}>Realizar Denuncia Online</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <TouchableOpacity style={[styles.mainButton, { backgroundColor: content.color }]} onPress={onClose}>
            <Text style={styles.mainButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const shadeColor = (color, percent) => {
  const num = Number.parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`
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
  closeButton: { padding: 4 },
  body: { padding: 20 },
  description: { fontSize: 16, color: "#454F63", lineHeight: 24, marginBottom: 20 },
  contactsContainer: { marginBottom: 20 },
  contactsTitle: { fontSize: 18, fontWeight: "bold", color: "#454F63", marginBottom: 12 },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    marginBottom: 8,
  },
  contactInfo: { flex: 1, marginLeft: 12 },
  contactName: { fontSize: 16, fontWeight: "600", color: "#454F63" },
  contactPhone: { fontSize: 14, color: "#666", marginTop: 2 },
  helpSection: {
    padding: 16,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    marginBottom: 20,
  },
  helpTitle: { fontSize: 16, fontWeight: "bold", color: "#454F63", marginBottom: 8 },
  helpText: { fontSize: 14, color: "#666", lineHeight: 22 },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F44336",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  reportButtonText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  mainButton: { margin: 16, padding: 16, borderRadius: 12, alignItems: "center" },
  mainButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
})

export default RiskModal
