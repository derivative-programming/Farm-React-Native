import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme'
   
export interface ReportInputMoneyProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const ReportInputMoney: FC<ReportInputMoneyProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
  isVisible = true,
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name); 

  const errorDisplayControlName = name + "ErrorDisplay";
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
      
  if (!isVisible) return null;

  return ( 
    <View style={styles.container}>
        <FormLabel text={label} name={name + '-label'}/>
        <View style={styles.horizontalStack}>
          <Text style={styles.prefix}>$</Text> 
          <TextInput
            style={[styles.input, disabled && styles.disabledInput]}
            keyboardType="numeric"
            placeholder="Amount"
            editable={!disabled}
            id={name} 
            testID={name}
            onChangeText={field.onChange(name)}
            onBlur={field.onBlur(name)}
            value={field.value.toString()}   
            
          />
        </View>
        {isInvalid && (
          <Text style={styles.errorText}>{meta.error}</Text>
        )}
    </View>
  );
};
   

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  }, 
  horizontalStack: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Center items vertically in the row 
  },
  prefix: {
    // Styling for the prefix text
  },
  input: {
    // Styling for the TextInput
    width: '100%',
    fontSize: theme.fonts.mediumSize,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 15, // Space below the input for spacing in forms
  },
  disabledInput: {
    // Styling for the disabled TextInput
    // backgroundColor: '#f7f7f7',
    // color: '#c7c7c7',
    // borderColor: '#e7e7e7',
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
    
  },
  
});