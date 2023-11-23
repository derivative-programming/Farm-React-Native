import React, { FC, ReactElement } from "react";
import { FormControl, Select, WarningOutlineIcon, Box, Text, CheckIcon } from 'react-native';
import {useField } from 'formik'; 
   
export interface ReportInputSelectProps {
  name: string
  label: string
  options:ReportInputSelectOption[]
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
}

export interface ReportInputSelectOption {
  label: string
  value: string
}
   
export const ReportInputSelect: FC<ReportInputSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  autoFocus = false,
  disabled = false,
}): ReactElement => {
  const [field, meta, helpers] = useField(name);  

  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
      
  return (
    // <div className="" >
    //   <Form.Group controlId={name}
    //     data-testid={name} className="mt-2 text-start">
    //       <Form.Label data-testid={name + '-label'}
    //         size="sm">{label}</Form.Label>
    //       <Form.Select
    //           data-testid={name + '-field'}
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
    //       <Form.Control.Feedback  className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
    //   </Form.Group>  
    // </div>
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Select
        selectedValue={field.value}
        onValueChange={value => helpers.setValue(value)}
        isDisabled={disabled}
        // Note: autoFocus prop is not applicable here
        _selectedItem={{
          bg: "cyan.600",
          endIcon: <CheckIcon size="5" />,
        }}
      >
        <Select.Item label="Please Select One" value="" />
        {options.map((item, index) => (
          <Select.Item key={index} label={item.label} value={item.value} />
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
};
   