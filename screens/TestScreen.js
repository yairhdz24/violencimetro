import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '..//Header';
import styles from '../styles/TestScreenStyles';
import { questions } from '../data/testQuestions';

const TestScreen = ({ currentQuestion, setCurrentScreen, handleAnswerSelect }) => {
  const currentQ = questions[currentQuestion];
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Test de Autoconocimiento"
        leftIcon="arrow-back"
        onLeftPress={() => setCurrentScreen('home')}
      />
      
      <View style={styles.testContainer}>
        <View style={styles.progressContainer}>
          {questions.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.progressDot, 
                index === currentQuestion ? styles.progressDotActive : 
                index < currentQuestion ? styles.progressDotCompleted : {}
              ]} 
            />
          ))}
        </View>
        
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Pregunta {currentQuestion + 1} de {questions.length}</Text>
          <Text style={styles.questionText}>{currentQ.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerSelect(index)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;