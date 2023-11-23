import React, { FC, ReactElement} from "react"; 
import {useField } from 'formik';
import { onKeyDown } from "../../../common/utilities"; 
import { FormControl, Input, WarningOutlineIcon } from 'react-native';
   
export interface ReportInputNumberProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
}
   
export const ReportInputNumber: FC<ReportInputNumberProps> = ({
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
  //           type="number"
  //           placeholder={placeholder}
  //           {...field} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //           onKeyDown={onKeyDown}
  //           isInvalid={isInvalid}
  //           size="sm"
  //         />
  //         <Form.Control.Feedback  className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
  <FormControl isInvalid={isInvalid}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        placeholder={placeholder}
        onChangeText={text => helpers.setValue(text)}
        onBlur={field.onBlur}
        value={field.value}
        isDisabled={disabled}
        autoFocus={autoFocus}
        keyboardType="numeric"
        onKeyPress={({ nativeEvent }) => {
            if (onKeyDown) onKeyDown(nativeEvent.key);
        }}
      />
      {meta.touched && meta.error ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
};
   