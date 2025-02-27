import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';

const HelpScreen = ({ navigation }) => {
  const faqItems = [
    {
      question: '¿Cómo funciona el Test de Autoconocimiento?',
      answer: 'El test consta de 5 preguntas que evalúan aspectos de tu bienestar emocional y organización personal. Al finalizar, recibirás un nivel en una escala de 0 a 10 y recomendaciones personalizadas.'
    },
    {
      question: '¿Puedo cambiar mi contraseña?',
      answer: 'Sí, puedes cambiar tu contraseña en cualquier momento desde la sección "Ajustes", seleccionando la opción "Cambiar contraseña".'
    },
    {
      question: '¿Cómo agrego contactos de confianza?',
      answer: 'Dirígete a la sección "Contactos" y pulsa el botón "Agregar contacto". Podrás añadir el nombre y número de teléfono de las personas que desees.'
    },
    {
      question: '¿Qué es el modo de ubicación?',
      answer: 'La función de ubicación te permite compartir tu localización en tiempo real con los contactos que hayas configurado previamente.'
    }
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Ayuda"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.helpContainer}>
        <Text style={styles.helpTitle}>Preguntas Frecuentes</Text>
        
        {faqItems.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}
        
        <View style={styles.resourcesSection}>
          <Text style={styles.resourcesTitle}>Recursos adicionales</Text>
          
          <TouchableOpacity style={styles.resourceItem}>
            <MaterialIcons name="phone" size={24} color="#5D9CEC" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>Línea de Ayuda</Text>
              <Text style={styles.resourceDescription}>Soporte 24/7 para situaciones de emergencia</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceItem}>
            <MaterialIcons name="article" size={24} color="#5D9CEC" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>Guía de Autoayuda</Text>
              <Text style={styles.resourceDescription}>Recursos para mejorar tu bienestar personal</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceItem}>
            <MaterialIcons name="groups" size={24} color="#5D9CEC" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>Comunidades de Apoyo</Text>
              <Text style={styles.resourceDescription}>Grupos de apoyo virtuales y presenciales</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Acerca de la App</Text>
          <Text style={styles.aboutText}>
            Versión 1.0.0
          </Text>
          <Text style={styles.aboutDescription}>
            Aplicación diseñada para ayudarte en tu desarrollo personal y bienestar emocional.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  helpContainer: {
    padding: 16,
  },
  helpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
  },
  resourcesSection: {
    marginTop: 24,
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  resourceInfo: {
    marginLeft: 16,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666666',
  },
  aboutSection: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  aboutText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default HelpScreen;