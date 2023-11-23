import React, { FC, ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { bootstrapColors } from "../../../constants/theme";
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
}
   
export const FormInputButton: FC<FormInputButtonProps> = ({
  name,
  buttonText,
  onPress,
  isButtonCallToAction = true, 
  isVisible = true,
  isEnabled = true,
  autoFocus = false,
  className = ""
}): ReactElement => { 
  
  let buttonVariant = "outline";
  if(isButtonCallToAction)
  {
    buttonVariant = "solid";
  }
 
      
  return (
    // <Box py="3">
    //   <Button testID={name} 
    //       id={name}
    //       onPress={onPress}
    //       style={{ display: isVisible ? 'flex' : 'none' }}
    //       disabled={!isEnabled} 
    //       isFocused={autoFocus}  
    //       variant={buttonVariant}>
    //       {buttonText}
    //   </Button>
    // </Box>
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
          <Text style={[styles.buttonText, 
            isButtonCallToAction && styles.solidButton, 
            !isButtonCallToAction && styles.outlineButton, 
            !isEnabled && styles.disabledButtonText]}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
   
const styles = StyleSheet.create({
  container: { 
    paddingVertical: 12, // py="3" equivalent, assuming 1 unit = 4
    // Add other styling as required
  },
  button: { 
    padding: 12,
    borderRadius: 6,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    // Add button styling here
  },
  disabledButton: {
    // Add disabled button styling here
    opacity: 0.5,
  },
  buttonText: { 
    fontSize: theme.fonts.mediumSize,
    fontWeight: 'bold',
    // Add button styling here
  },
  disabledButtonText: {
    // Add disabled button styling here
    opacity: 0.5,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: bootstrapColors.primary, // You can use your theme's primary color 
  },
  outlineButtonText: {
    color: bootstrapColors.primary, // This can be the same as the border color 
  }, 
  solidButton: {
    backgroundColor: bootstrapColors.primary,
    borderWidth: 1,
    borderColor: bootstrapColors.primary, // You can use your theme's primary color 
  },
  solidButtonText: {
    color: 'white',  
  },
  // Additional styles can be added as needed
});