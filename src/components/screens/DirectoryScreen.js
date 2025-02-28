import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Platform 
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const directoryItems = [
  {
    id: 1,
    name: "Centro de Justicia para las Mujeres",
    description: "Atención integral y acceso a la justicia para mujeres víctimas de violencia.",
    address: "Prolongación Av. Pasteur Sur 997, Col. Fraternidad de Santiago, Querétaro, Qro.",
    phones: ["442 303 2261", "442 303 2262"],
    emergency: "911",
    email: "centrodejusticia@queretaro.gob.mx",
    services: [
      "Asesoría jurídica",
      "Atención psicológica y médica",
      "Protección y refugio",
    ],
  },
  {
    id: 2,
    name: "Instituto Municipal de las Mujeres",
    description: "Promueve la igualdad de género y brinda apoyo a mujeres en situación vulnerable.",
    address: "Bosques de los Berros #406, Col. Bosques de las Lomas, Querétaro, Qro.",
    phones: ["442 210 0624"],
    emergency: "442 216 4757",
    email: "inmujeres@queretaro.gob.mx",
    services: [
      "Atención psicológica gratuita",
      "Capacitación en derechos y empoderamiento",
      "Asesoría legal y acompañamiento",
    ],
  },
  {
    id: 3,
    name: "Casa de la Mujer",
    description: "Brinda apoyo emocional y asesoría legal a mujeres en riesgo.",
    address: "Calle Juárez #45, Col. Centro, Querétaro, Qro.",
    phones: ["442 215 6789"],
    emergency: "800 911 2000",
    email: "casadelamujer@queretaro.gob.mx",
    services: [
      "Terapia individual y grupal",
      "Asesoría legal gratuita",
      "Refugio temporal",
    ],
  },
  {
    id: 4,
    name: "Centro de Atención a Mujeres en Riesgo",
    description: "Ofrece refugio temporal y asesoría integral a víctimas de violencia.",
    address: "Av. Universidad #100, Col. San Pablo, Querétaro, Qro.",
    phones: ["442 567 8910"],
    emergency: "800 123 4567",
    services: [
      "Refugio seguro",
      "Atención psicológica",
      "Asesoría legal y denuncia",
    ],
  },
  {
    id: 5,
    name: "Red de Apoyo a Mujeres en Crisis",
    description: "Grupo de voluntarias que brindan acompañamiento y apoyo legal a mujeres.",
    address: "Calle Independencia #230, Col. Centro Histórico, Querétaro, Qro.",
    phones: ["442 789 0123"],
    emergency: "800 555 6789",
    services: [
      "Apoyo emocional",
      "Acompañamiento en trámites",
      "Capacitaciones en derechos",
    ],
  },
  {
    id: 6,
    name: "Centro Integral de Atención a la Mujer",
    description: "Ofrece atención integral para mujeres en situación de violencia.",
    address: "Blvd. Bernardo Quintana 800, Col. Centro Sur, Querétaro, Qro.",
    phones: ["442 345 6789"],
    emergency: "800 789 6543",
    email: "cim@queretaro.gob.mx",
    services: [
      "Atención psicológica y social",
      "Asesoría legal",
      "Terapia y reinserción",
    ],
  },
];

const DirectoryScreen = ({ navigation }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleOpenMap = (address) => {
    const mapUrl = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`
    });
    
    Linking.canOpenURL(mapUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(mapUrl);
        }
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        return Linking.openURL(webUrl);
      })
      .catch(err => console.error('Error al abrir el mapa', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centros de Ayuda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.directoryContainer}>
        {directoryItems.map((item) => (
          <View key={item.id} style={styles.directoryItem}>
            <TouchableOpacity 
              style={styles.itemHeader} 
              onPress={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
            >
              <Text style={styles.itemTitle}>{item.name}</Text>
              <MaterialIcons 
                name={expandedItem === item.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#1f4035" 
              />
            </TouchableOpacity>

            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description}
            </Text>

            {expandedItem === item.id && (
              <View style={styles.itemDetails}>
                <TouchableOpacity 
                  style={styles.row} 
                  onPress={() => handleOpenMap(item.address)}
                >
                  <MaterialIcons name="location-on" size={18} color="#1f4035" />
                  <Text style={styles.infoText}>{item.address}</Text>
                </TouchableOpacity>

                {item.phones?.map((phone) => (
                  <TouchableOpacity 
                    key={phone} 
                    style={styles.row} 
                    onPress={() => handleCall(phone)}
                  >
                    <Feather name="phone" size={18} color="#1f4035" />
                    <Text style={styles.infoText}>{phone}</Text>
                  </TouchableOpacity>
                ))}

                {item.emergency && (
                  <TouchableOpacity 
                    style={[styles.row, styles.emergencyContainer]} 
                    onPress={() => handleCall(item.emergency)}
                  >
                    <MaterialIcons name="warning" size={18} color="red" />
                    <Text style={styles.emergencyText}>Emergencias: {item.emergency}</Text>
                  </TouchableOpacity>
                )}

                {item.email && (
                  <TouchableOpacity 
                    style={styles.row} 
                    onPress={() => handleEmail(item.email)}
                  >
                    <MaterialIcons name="email" size={18} color="#1f4035" />
                    <Text style={styles.infoText}>{item.email}</Text>
                  </TouchableOpacity>
                )}

                <Text style={styles.sectionTitle}>Servicios:</Text>
                {item.services.map((service, index) => (
                  <View key={index} style={styles.row}>
                    <MaterialIcons name="check-circle" size={18} color="#1f4035" />
                    <Text style={styles.infoText}>{service}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.emergencyButton}
        onPress={() => handleCall('911')}
      >
        <MaterialIcons name="phone" size={24} color="white" />
        <Text style={styles.emergencyButtonText}>Emergencia</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: "#1f4035",
    padding: 16,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  directoryContainer: {
    padding: 16,
  },
  directoryItem: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f4035",
    flex: 1,
  },
  itemDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  itemDetails: {
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  emergencyContainer: {
    backgroundColor: "#ffebee",
  },
  emergencyText: {
    marginLeft: 8,
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1f4035",
    marginTop: 10,
    marginBottom: 4,
  },
  emergencyButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e53935",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 3,
  },
  emergencyButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default DirectoryScreen;