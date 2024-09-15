import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik';
import {FormInputErrorDisplay } from './InputErrorDisplay';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme'
   
export interface FormInputTextAreaProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
  isRequired?: boolean;
  detailText?: string; 
}
   
export const FormInputTextArea: FC<FormInputTextAreaProps> = ({
  name,
  label,
  placeholder,
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
      <TextInput
        style={[styles.textArea, disabled && styles.disabledTextArea]}
        multiline={true}
        numberOfLines={3}
        placeholder={placeholder}
        editable={!disabled}
        id={name} 
        testID={name}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}   
        autoFocus={autoFocus}
        
      />
      {isInvalid && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
      {detailText.length > 0 && (
        <Text style={styles.detailText}> 
          {detailText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, // mb="2" equivalent, assuming 1 unit = 4
    
  }, 
  textArea: {
    // Styling for the TextInput as a TextArea
    textAlignVertical: 'top', // Important for multiline
    
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
  disabledTextArea: {
    // Styling for the disabled TextArea
    // backgroundColor: '#f7f7f7',
    // color: '#c7c7c7',
    // borderColor: '#e7e7e7',
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
    
  },
  detailText: {
    color: '#6c757d',  
    fontSize: theme.fonts.smallSize,
    marginTop: -10,  // Adjust spacing as needed
    marginBottom: 10,
  },
  
});
   