import React, { FC, ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import * as theme from '../../../constants/theme'

 
   
export interface FormLabelProps {
  name?: string
  text: string  
  isVisible?:boolean  
}
   
export const FormLabel: FC<FormLabelProps> = ({
  name = "",
  text= "", 
  isVisible = true,  
}): ReactElement | null => { 
   
  if(!isVisible) return null;
      
  return ( 
    <Text 
      style={styles.label} 
      testID={name}>
      {text}
    </Text>
  );
};
   
const styles = StyleSheet.create({ 
  label: {
    fontSize: theme.fonts.mediumSize,         // Medium font size for clear readability
    color: '#333',        // A dark color for contrast, but not too harsh
    marginBottom: 8,      // Space below the label before the next element
    fontWeight: 'bold',   // Optional: bold font weight to make it stand out
    // textTransform: 'uppercase', // Optional: uppercase letters for emphasis
  },
});