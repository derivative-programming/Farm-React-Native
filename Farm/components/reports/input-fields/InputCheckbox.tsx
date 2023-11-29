import React, { FC, ReactElement } from "react"; 
import {useField } from 'formik'; 
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { FormLabel } from "./InputLabel";
   
export interface ReportInputCheckboxProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const ReportInputCheckbox: FC<ReportInputCheckboxProps> = ({
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
    <View style={styles.switchContainer}>
      <FormLabel text={label} name={name + '-label'}/> 
      <Switch 
        value={field.value}
        disabled={disabled}
        testID={name} 
        onValueChange={(value) => {
          helpers.setValue(value);
        }}
        // onChangeText={field.onChange(name)}
        // onBlur={field.onBlur(name)} 
      /> 
    </View>
    {meta.touched && meta.error && (
      <Text style={styles.errorText}>{meta.error}</Text>
    )}
  </View>
  );
};
   

const styles = StyleSheet.create({
  container: {
    
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8, // Add space between the switch and the label 
  }, 
  errorText: {
    color: 'red',
    marginBottom: 8,     
  },
  
});