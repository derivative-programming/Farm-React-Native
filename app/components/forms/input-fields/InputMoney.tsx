import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme'
import { DetailsText } from "./DetailText";
   
export interface FormInputMoneyProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
  isRequired?: boolean;
  detailText?: string; 
}
   
export const FormInputMoney: FC<FormInputMoneyProps> = ({
  name,
  label,
  placeholder = "Amount",
  autoFocus = false,
  disabled = false,
  isVisible = true,
  isRequired = false,
  detailText = '', 
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name); 

  const errorDisplayControlName = name + "ErrorDisplay";
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
      
  if (!isVisible) return null;

  return ( 
    <View style={styles.container}>
      <FormLabel text={label} name={name + '-label'} isRequired={isRequired} />
        <View style={styles.horizontalStack}>
          <Text style={styles.prefix}>$</Text> 
          <TextInput
            style={[styles.input, disabled && styles.disabledInput]}
            keyboardType="numeric"
            placeholder={placeholder}
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
        {detailText.length > 0 && (
          <DetailsText content={detailText} />  
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
    fontSize: theme.fonts.mediumSize, // Ensure the font size matches the input
    paddingRight: 8, // Add space between the $ and the input
    color: '#333',
  },
  input: {
    flex: 1, // Ensure the input takes up the remaining space
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
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
  }, 
});
