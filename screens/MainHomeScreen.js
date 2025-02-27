import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';

const getRiskColor = (level) => {
  if (level <= 3) return "#4CAF50";
  if (level <= 7) return "#FFC107";
  return "#FF5252";
};

const MainHomeScreen = ({
  toggleDrawer,
  handleSosPress,
  riskLevel,
  startTest,
  setCurrentScreen,
  sosActive,
  deactivateSOS,
  showPanicButton,
  handlePanicAction,
}) => {
  const lionAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      ]),
    ).start();
  }, [lionAnimation]);

  const translateY = lionAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Bienestar Personal"
        leftIcon="menu"
        rightIcon="settings"
        onLeftPress={toggleDrawer}
        onRightPress={handleSosPress}
      />

      <ScrollView contentContainerStyle={styles.homeContent}>
        <Animated.View style={[styles.lionContainer, { transform: [{ translateY }] }]}>
          <Image
            source={{
              uri: "https://api.a0.dev/assets/image?text=a%20cute%20cartoon%20lion%20mascot%20with%20friendly%20expression&aspect=1:1",
            }}
            style={styles.lionImage}
          />
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>
              ¡Hola! Soy Leo, tu asistente personal. ¿Te gustaría realizar un test rápido de auto-conocimiento?
            </Text>
          </View>
        </Animated.View>

        <View style={styles.riskMeterContainer}>
          <Text style={styles.riskMeterTitle}>Nivel de Autoconocimiento</Text>
          <View style={styles.riskMeterBar}>
            <View
              style={[
                styles.riskMeterFill,
                { width: `${(riskLevel / 10) * 100}%`, backgroundColor: getRiskColor(riskLevel) },
              ]}
            />
          </View>
          <View style={styles.riskLabels}>
            <Text style={styles.riskLabelLow}>Básico</Text>
            <Text style={styles.riskLabelMedium}>Intermedio</Text>
            <Text style={styles.riskLabelHigh}>Avanzado</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startTestButton} onPress={startTest}>
          <Text style={styles.startTestButtonText}>Iniciar Test</Text>
        </TouchableOpacity>

        <View style={styles.quickAccessContainer}>
          <TouchableOpacity style={styles.quickAccessButton} onPress={() => setCurrentScreen("forum")}>
            <MaterialIcons name="forum" size={24} color="#5D9CEC" />
            <Text style={styles.quickAccessText}>Foro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessButton} onPress={() => setCurrentScreen("directory")}>
            <MaterialIcons name="library-books" size={24} color="#5D9CEC" />
            <Text style={styles.quickAccessText}>Directorio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessButton} onPress={() => setCurrentScreen("contacts")}>
            <MaterialIcons name="contacts" size={24} color="#5D9CEC" />
            <Text style={styles.quickAccessText}>Contactos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {sosActive && (
        <View style={styles.sosActiveIndicator}>
          <Text style={styles.sosActiveText}>Asistencia activa</Text>
          <TouchableOpacity style={styles.sosDeactivateButton} onPress={deactivateSOS}>
            <Text style={styles.sosDeactivateText}>Desactivar</Text>
          </TouchableOpacity>
        </View>
      )}

      {showPanicButton && (
        <TouchableOpacity style={styles.panicButton} onPress={handlePanicAction}>
          <MaterialIcons name="clear" size={24} color="#FFF" />
        </TouchableOpacity>
      )}

      {/* Hidden SOS Button */}
      <TouchableOpacity style={styles.hiddenSosButton} onPress={handleSosPress} activeOpacity={1} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  homeContent: {
    padding: 16,
  },
  lionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  lionImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  chatBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  chatText: {
    fontSize: 14,
    color: '#333333',
  },
  riskMeterContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  riskMeterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  riskMeterBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  riskMeterFill: {
    height: '100%',
  },
  riskLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  riskLabelLow: {
    fontSize: 12,
    color: '#4CAF50',
  },
  riskLabelMedium: {
    fontSize: 12,
    color: '#FFC107',
  },
  riskLabelHigh: {
    fontSize: 12,
    color: '#FF5252',
  },
  startTestButton: {
    backgroundColor: '#5D9CEC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  startTestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickAccessText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333333',
  },
  sosActiveIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF5252',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sosActiveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sosDeactivateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sosDeactivateText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  panicButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenSosButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default MainHomeScreen;