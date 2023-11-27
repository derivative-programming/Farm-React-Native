import React, { FC, ReactElement,} from "react"; 
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'; 
import * as theme from '../../../../../constants/theme'
   
export interface ReportColumnDisplayButtonProps {
  forColumn:string 
  value: string 
  buttonText:string  
  onPress():void
  isVisible?:boolean
  isEnabled?: boolean;
  conditionallyVisible?:boolean
  isButtonCallToAction?:boolean
}
   
export const ReportColumnDisplayButton: FC<ReportColumnDisplayButtonProps> = ({
  forColumn,  
  buttonText, 
  onPress,
  isVisible = true,
  isEnabled = true,
  conditionallyVisible = true,
  isButtonCallToAction = false,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-0';
  const buttonName = groupName + '-button'; 
  
  const displayValue = (isVisible && conditionallyVisible);
       
  let buttonVariant = "outline";
  if(isButtonCallToAction)
  {
    buttonVariant = "solid";
  }

  if (!displayValue) return null;

  return (  

        
    <View style={styles.container}>
    {isVisible && (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, 
          isButtonCallToAction && styles.solidButton, 
          !isButtonCallToAction && styles.outlineButton, 
          !isEnabled && styles.disabledButton]}
        testID={buttonName}
        id={buttonName}
        disabled={!isEnabled} 
        // accessibilityTraits={autoFocus ? 'button' : undefined}
        // accessibilityComponentType={autoFocus ? 'button' : undefined}
      >
        
        
        <Text style={[styles.buttonText, 
          isButtonCallToAction && styles.solidButtonText, 
          !isButtonCallToAction && styles.outlineButtonText, 
          !isEnabled && styles.disabledButtonText]}>{buttonText}
        </Text>
        
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