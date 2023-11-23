import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';  
import { FormLabel } from "./InputLabel";

   
export interface FormInputSelectProps {
  name: string
  label: string
  options:FormInputSelectOption[]
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}

export interface FormInputSelectOption {
  label: string
  value: string
}
   
export const FormInputSelect: FC<FormInputSelectProps> = ({
  name,
  label,
  options,
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
    // <div className="" hidden={!isVisible}>
    //   <Form.Group controlId={name} className="mb-2 text-start">
    //       <Form.Label data-testid={name + '-label'}
    //         size="sm">{label}</Form.Label>
    //       <Form.Select
    //           data-testid={name}
    //           aria-label={name}  
    //           {...field} 
    //           disabled={disabled}
    //           autoFocus={autoFocus}
    //           isInvalid={isInvalid}
    //           size="sm"
    //       >
    //           <option>Please Select One</option>
    //           {options.map((item, index) => {
    //               return (
    //               <option
    //                   data-test-option-id="select-option"
    //                   key={index}
    //                   value={item.value}
    //               >
    //                 {item.label}
    //               </option>
    //               );
    //           })}
    //       </Form.Select>
    //       <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
    //   </Form.Group>  
    // </div>

    // <VStack space={2} width="100%">
    //   <FormControl isInvalid={isInvalid} isDisabled={disabled}>
    //     <FormControl.Label>{label}</FormControl.Label>
    //     <Select
    //       selectedValue={field.value}
    //       onValueChange={(itemValue) => field.onChange(name)(itemValue)}
    //       testID={name}
    //       accessibilityLabel={name}
    //       _selectedItem={{
    //         bg: "teal.600",
    //         endIcon: <CheckIcon size="5" />,
    //       }}
    //       placeholder="Please Select One"
    //       isDisabled={disabled}
    //     >
    //       {options.map((item, index) => (
    //         <Select.Item key={index} label={item.label} value={item.value} />
    //       ))}
    //     </Select>
    //     {isInvalid && (
    //       <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
    //         {meta.error}
    //       </FormControl.ErrorMessage>
    //     )}
    //   </FormControl>
    // </VStack>
    <View style={styles.container}>
      <FormLabel text={label} name={name + '-label'}/>
      <Picker
        selectedValue={field.value}
        onValueChange={(itemValue) => field.onChange(name)(itemValue)}
        enabled={!disabled}
        testID={name}
        accessibilityLabel={name}
        style={styles.picker}
        // Additional Picker props as needed
      >
        <Picker.Item label="Please Select One" value="" />
        {options.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
      {isInvalid && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
    </View>
  );
};
   

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // Additional container styling
  }, 
  picker: {
    // Styling for the Picker
  },
  errorText: {
    color: 'red',
    // Additional styling for the error message text
  },
  // Add any other styles as needed
});