import React, { FC, ReactElement } from "react";
import { Button, TouchableOpacity, StyleSheet, View } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';

export interface ScreenBackButtonProps {
  name: string; 
  buttonText: string; 
  onPress(): void; 
  isVisible?: boolean;
  isEnabled?: boolean;
  className?: string; 
}

export const ScreenBackButton: FC<ScreenBackButtonProps> = ({
  name, 
  buttonText, 
  onPress, 
  isVisible = true,
  isEnabled = true,
  // type,

  className = "",
}): ReactElement => {

 

  return (
    <View>
      {isVisible ? (
        <TouchableOpacity  testID={name}
            style={styles.backButton}
            onPress={onPress} 
            disabled={!isEnabled} 
        >
            <Icon name="arrow-back" size={25} color="#000" />  
        </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} testID={name} /> 
        )
      }
    </View>
  );
}; 


const styles = StyleSheet.create({ 
  backButton: {
      paddingLeft: 10,
      // alignSelf: 'flex-start', // Align button to the left
      // flexDirection: 'row',
      
      
  }, 
  placeholder: {
      width: 35, // Adjust to match the width of your back button
      // Height, padding, or any other styling to match the back button
  }, 
});
