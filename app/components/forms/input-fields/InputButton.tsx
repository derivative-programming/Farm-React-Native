import React, { FC, ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'; 
import * as theme from '../../../constants/theme'

 
   
export interface FormInputButtonProps {
  name: string
  buttonText: string
  onPress(): void
  isButtonCallToAction?:boolean 
  isVisible?:boolean
  isEnabled?:boolean
  autoFocus?:boolean
  className?:string
  isProcessing?:boolean
}
   
export const FormInputButton: FC<FormInputButtonProps> = ({
  name,
  buttonText,
  onPress,
  isButtonCallToAction = true, 
  isVisible = true,
  isEnabled = true,
  autoFocus = false,
  className = "",
  isProcessing = false,
}): ReactElement => { 
  
  // let buttonVariant = "outline";
  // if(isButtonCallToAction)
  // {
  //   buttonVariant = "solid";
  // }
 
      
  return ( 
    <View style={styles.container}>
      {isVisible && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, 
            isButtonCallToAction && styles.solidButton, 
            !isButtonCallToAction && styles.outlineButton, 
            !isEnabled && styles.disabledButton]}
          testID={name}
          id={name}
          disabled={!isEnabled} 
          // accessibilityTraits={autoFocus ? 'button' : undefined}
          // accessibilityComponentType={autoFocus ? 'button' : undefined}
        >
          
          {
            isProcessing ?
              <ActivityIndicator color="#fff" /> :
              <Text style={[styles.buttonText, 
                isButtonCallToAction && styles.solidButtonText, 
                !isButtonCallToAction && styles.outlineButtonText, 
                !isEnabled && styles.disabledButtonText]}>{buttonText}
              </Text>
          }
          
        </TouchableOpacity>
      )}
    </View>
  );
};
   
const styles = StyleSheet.create({
  container: { 
    paddingVertical: 12, // py="3" equivalent, assuming 1 unit = 4
    
  },
  button: { 
    padding: 12,
    borderRadius: 6,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    
  },
  disabledButton: {
    
    opacity: 0.5,
  },
  buttonText: { 
    fontSize: theme.fonts.mediumSize,
    fontWeight: 'bold',
    
  },
  disabledButtonText: {
    
    opacity: 0.5,
  },
  outlineButton: {
    backgroundColor: theme.Colors.secondary,
    borderWidth: 1,
    borderColor: theme.Colors.secondary, // You can use your theme's primary color 
  },
  outlineButtonText: {
    color: 'white', // This can be the same as the border color 
  }, 
  solidButton: {
    backgroundColor: theme.Colors.primary,
    borderWidth: 1,
    borderColor: theme.Colors.primary, // You can use your theme's primary color 
  },
  solidButtonText: {
    color: 'white',  
  },
  
});