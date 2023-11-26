import React, { FC, ReactElement } from "react";
import { View, Text, StyleSheet } from 'react-native';
import {useField } from 'formik'; 
import { Checkbox, FormControl } from 'react-native';
   
export interface ReportInputCheckboxProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
}
   
export const ReportInputCheckbox: FC<ReportInputCheckboxProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
}): ReactElement => {
  const [field, meta, helpers] = useField(name);   
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
      
  return (
  //   <div className="">
  //     <Form.Group controlId={name} 
  //       data-testid={name}
  //       className="mt-2 text-start"> 
  //         <Form.Check
  //           // ref={inputRef}
  //           data-testid={name + '-field'}
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
  //         <Form.Control.Feedback  className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
  <View style={styles.container}>
      <FormControl isInvalid={meta.touched && !!meta.error}>
        <Checkbox
          isChecked={field.value}
          onChange={(isChecked) => helpers.setValue(isChecked)}
          // onBlur={field.onBlur}
          isDisabled={disabled} 
          value={""}>
          {label}
        </CheckView>
        {meta.touched && meta.error && (
          <FormControl.ErrorMessage>
            {meta.error}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </View>
  );
};
   
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    // Additional styles
  },
  // ... other styles
});