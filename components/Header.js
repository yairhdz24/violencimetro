import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/HeaderStyles';

const Header = ({ 
  title, 
  leftIcon, 
  rightIcon, 
  onLeftPress, 
  onRightPress 
}) => {
  return (
    <View style={styles.header}>
      {leftIcon ? (
        <TouchableOpacity onPress={onLeftPress}>
          <MaterialIcons name={leftIcon} size={28} color="#5D9CEC" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress}>
          <MaterialIcons name={rightIcon} size={28} color="#5D9CEC" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
    </View>
  );
};

export default Header;