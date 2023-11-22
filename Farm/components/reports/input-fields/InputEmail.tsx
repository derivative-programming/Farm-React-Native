import React, { FC, ReactElement } from "react"; 
import {useField } from 'formik'; 
import { FormControl, Icon, Input, Text, WarningOutlineIcon } from "native-base";
   
export interface ReportInputEmailProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
}
   
export const ReportInputEmail: FC<ReportInputEmailProps> = ({
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
  //       data-testid={name} className="mt-2 text-start">
  //         <Form.Label data-testid={name + '-label'}
  //           size="sm">{label}</Form.Label>
  //         <Form.Control
  //           // ref={inputRef}
  //           data-testid={name + '-field'}
  //           type="email"
  //           placeholder={placeholder}
  //           {...field} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //           isInvalid={isInvalid}
  //           size="sm"
  //         />
  //         <Form.Control.Feedback  className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input 
        placeholder={placeholder}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        isDisabled={disabled}
        autoFocus={autoFocus}
        keyboardType="email-address"
      />
      {meta.touched && meta.error ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
};
   