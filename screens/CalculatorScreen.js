import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalculatorScreen = ({ navigation }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');

  const handleNumberInput = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (op) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const first = parseFloat(firstValue);
    const second = parseFloat(displayValue);
    if (operator === '+') setDisplayValue((first + second).toString());
    if (operator === '-') setDisplayValue((first - second).toString());
    if (operator === '×') setDisplayValue((first * second).toString());
    if (operator === '÷') setDisplayValue((first / second).toString());
    setOperator(null);
    setFirstValue('');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculatorContainer}>
        <View style={styles.calculatorDisplay}>
          <Text style={styles.calculatorResult}>{displayValue}</Text>
        </View>
        
        <View style={styles.calculatorKeypad}>
          {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((key, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.calculatorKey,
                isNaN(parseInt(key)) && key !== '.' && key !== '0' ? styles.calculatorKeyOperator : {},
                key === '0' ? styles.calculatorKeyZero : {},
                key === '=' ? styles.calculatorKeyEquals : {}
              ]}
              onPress={() => {
                if (key === 'C') handleClear();
                else if (key === '=') handleEqual();
                else if (['+', '-', '×', '÷'].includes(key)) handleOperatorInput(key);
                else handleNumberInput(key);
              }}
            >
              <Text style={[
                styles.calculatorKeyText,
                isNaN(parseInt(key)) && key !== '.' ? styles.calculatorKeyTextOperator : {}
              ]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  calculatorDisplay: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'flex-end',
  },
  calculatorResult: {
    fontSize: 48,
    color: '#333333',
  },
  calculatorKeypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calculatorKey: {
    width: '25%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  calculatorKeyOperator: {
    backgroundColor: '#5D9CEC',
  },
  calculatorKeyZero: {
    width: '50%',
  },
  calculatorKeyEquals: {
    backgroundColor: '#FF5252',
  },
  calculatorKeyText: {
    fontSize: 24,
    color: '#333333',
  },
  calculatorKeyTextOperator: {
    color: '#FFFFFF',
  },
});

export default CalculatorScreen;