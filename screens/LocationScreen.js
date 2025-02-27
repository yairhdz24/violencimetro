import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '..//Header';

const LocationScreen = ({ navigation, route }) => {
  const { sosActive, activateSOS, deactivateSOS } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Ubicación"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.locationContainer}>
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=map%20with%20location%20marker%20city%20streets&aspect=16:9' }} 
            style={styles.mapImage} 
          />
          <View style={styles.mapPin}>
            <MaterialIcons name="location-pin" size={36} color="#FF5252" />
          </View>
        </View>
        
        <View style={styles.locationActions}>
          <TouchableOpacity 
            style={[styles.locationActionButton, sosActive ? styles.locationActionButtonActive : {}]}
            onPress={sosActive ? deactivateSOS : activateSOS}
          >
            <MaterialIcons 
              name={sosActive ? "location-off" : "location-on"} 
              size={24} 
              color={sosActive ? "#FF5252" : "#5D9CEC"} 
            />
            <Text 
              style={[
                styles.locationActionText, 
                sosActive ? styles.locationActionTextActive : {}
              ]}
            >
              {sosActive ? "Detener rastreo" : "Iniciar rastreo"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationActionButton}>
            <MaterialIcons name="share" size={24} color="#5D9CEC" />
            <Text style={styles.locationActionText}>Compartir ubicación</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationActionButton}>
            <MaterialIcons name="report" size={24} color="#5D9CEC" />
            <Text style={styles.locationActionText}>Denunciar incidente</Text>
          </TouchableOpacity>
        </View>
        
        {sosActive && (
          <View style={styles.locationSosActive}>
            <Text style={styles.locationSosTitle}>Compartiendo ubicación</Text>
            <Text style={styles.locationSosSubtitle}>
              Tu ubicación está siendo compartida en tiempo real con tus contactos de emergencia
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  locationContainer: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -36,
  },
  locationActions: {
    marginBottom: 16,
  },
  locationActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  locationActionButtonActive: {
    backgroundColor: '#FFEBEE',
  },
  locationActionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
  locationActionTextActive: {
    color: '#FF5252',
  },
  locationSosActive: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  locationSosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5252',
    marginBottom: 8,
  },
  locationSosSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
});

export default LocationScreen;