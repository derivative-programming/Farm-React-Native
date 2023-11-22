import React, { FC, ReactElement } from "react"; 
import "../../../App.scss";
import {useField } from 'formik';
import {FormInputErrorDisplay } from './InputErrorDisplay';
import { FormControl, TextArea, WarningOutlineIcon } from "native-base";
   
export interface FormInputTextAreaProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputTextArea: FC<FormInputTextAreaProps> = ({
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
      // <Form.Group controlId={name} className="mb-2 text-start">
      //     <Form.Label data-testid={name + '-label'}
      //       size="sm">{label}</Form.Label>
      //     <Form.Control
      //       // ref={inputRef}
      //       as="textarea"
      //       data-testid={name}
      //       type="text"
      //       rows={3}
      //       placeholder={placeholder}
      //       {...field} 
      //       disabled={disabled}
      //       autoFocus={autoFocus}
      //       isInvalid={isInvalid}
      //       size="sm"
      //     />
      //     <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
      // </Form.Group>  
  
    <FormControl isInvalid={isInvalid} isDisabled={disabled} mb="2">
      <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
      <TextArea
        autoCompleteType={undefined} 
        testID={name}
        numberOfLines={3} 
        placeholder={placeholder}
        {...field}
        isDisabled={disabled}
        autoFocus={autoFocus}  
      />
      {isInvalid && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
   