import React, { FC, ReactElement } from "react"; 
import {useField } from 'formik'; 
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { FormLabel } from "./InputLabel";
   
export interface FormInputCheckboxProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputCheckbox: FC<FormInputCheckboxProps> = ({
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
  //   <div className="" hidden={!isVisible}>
  //     <Form.Group controlId={name} className="mt-3 mb-3 text-start"> 
  //         <Form.Check
  //           // ref={inputRef}
  //           data-testid={name}
  //           type="checkbox"
  //           placeholder={placeholder}
  //           checked={field.value}
  //           name={field.name}
  //           value={field.value}
  //           onChange={(e) => {helpers.setValue(e.target.checked);}}
  //           onBlur={field.onBlur} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //           label={label}
  //           isInvalid={isInvalid} 
  //         />
  //         <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
  // <VStack space={2} width="100%" mt="3" mb="3">
  //     <FormControl isInvalid={!!(meta.touched && meta.error)} isDisabled={disabled}>
  //       <Checkbox
  //         value={field.value ? 'checked' : 'unchecked'}
  //         isChecked={field.value}
  //         onChange={(isChecked) => helpers.setValue(isChecked)} 
  //         // onBlur={field.onBlur}
  //         isDisabled={disabled}
  //       >
  //         {label}
  //       </Checkbox>
  //       {meta.touched && meta.error && (
  //         <Text color="red.500">{meta.error}</Text>
  //       )}
  //     </FormControl>
  //   </VStack>
  <View style={styles.container}>
    <View style={styles.switchContainer}>
      <FormLabel text={label} name={name + '-label'}/> 
      <Switch
        // onValueChange={(e) => {helpers.setValue(e.target.checked);}}
        value={field.value}
        disabled={disabled}
        testID={name} 
        onValueChange={(value) => {
          helpers.setValue(value);
        }}
        // onChangeText={field.onChange(name)}
        // onBlur={field.onBlur(name)}
        // value={field.value.toString()}   
        // Additional props for Switch as needed
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
    // Styles for the container
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8, // Add space between the switch and the label
    // Additional styles for the switch container
  }, 
  errorText: {
    color: 'red',
    marginBottom: 8,    
    // Styles for the error text
  },
  // Other styles as needed
});