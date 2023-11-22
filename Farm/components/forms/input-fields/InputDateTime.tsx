import React, { FC, ReactElement, useState } from "react"; 

import {useField } from 'formik';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker'; 
import {FormInputErrorDisplay } from './InputErrorDisplay';
import { Button, FormControl, VStack, Text } from "native-base";
   
export interface FormInputDateTimeProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputDateTime: FC<FormInputDateTimeProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
  isVisible = true,
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name); 
  const [show, setShow] = useState(false);

  const getDisplayDateTime = () => {
    const dt:moment.Moment = moment.utc(
        field.value,
        moment.ISO_8601
      );
    if(dt.isValid()){
      return dt.local();
    } else {
      return moment();
    } 
  }

  const selectedDateTimeLocal:moment.Moment = getDisplayDateTime();

  const errorDisplayControlName = name + "ErrorDisplay";
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
  
  if (!isVisible) return null;

  
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || selectedDateTimeLocal.toDate();
    setShow(false);
    helpers.setValue(moment(currentDate).utc().format("YYYY-MM-DDTHH:mm"));
  };
  
  return (
  //   <div className="" hidden={!isVisible}>
  //     <Form.Group controlId={name} className="mb-2 text-start">
  //         <Form.Label data-testid={name + '-label'}>{label}</Form.Label>
  //         <DatePicker
  //           // ref={inputRef}
  //           size="small"
  //           showTime={true}
  //           format="M/D/YYYY h:mm A"
  //           data-testid={name} 
  //           aria-label={name} 
  //           placeholder={placeholder}
  //           name={field.name}
  //           defaultValue={selectedDateTimeLocal}
  //           value={selectedDateTimeLocal}
  //           onChange={(e) => helpers.setValue(moment(e).utc().format("YYYY-MM-DDTHH:mm"))}
  //           onBlur={field.onBlur} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //         /> 
  //     </Form.Group>
  //     <FormInputErrorDisplay name={errorDisplayControlName} forInputName={name} /> 
  // </div>
    <VStack space={2} width="100%">
      <FormControl isInvalid={isInvalid} isDisabled={disabled}>
        <FormControl.Label>{label}</FormControl.Label>
        <Button onPress={() => setShow(true)} isDisabled={disabled}>
          {selectedDateTimeLocal.format("M/D/YYYY h:mm A") || placeholder}
        </Button>
        {show && (
          <DateTimePicker
          value={new Date(selectedDateTimeLocal.toDate())}
            mode="datetime" 
            // is24Hour={false}
            display="default"
            onChange={onChange}
            disabled={disabled}
          />
        )}
        {meta.touched && meta.error && (
          <Text color="red.500">{meta.error}</Text>
        )}
      </FormControl>
    </VStack>
  );
};
   