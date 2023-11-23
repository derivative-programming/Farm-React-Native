import React, { FC, ReactElement, useState } from "react"; 
import {useField } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"; 
import {ReportInputErrorDisplay } from './InputErrorDisplay';
import { View,Text, Button } from 'react-native';
   
export interface ReportInputDateProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
}
   
export const ReportInputDate: FC<ReportInputDateProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
}): ReactElement => {
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
  
  const onDateChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || field.value;
    setShow(false);
    helpers.setValue(moment(currentDate).format('YYYY-MM-DD'));
  };
  
  const displayDate = field.value ? moment(field.value).format('YYYY-MM-DD') : '';


  return (
  //   <div className=" ">
  //     <Form.Group controlId={name} 
  //       data-testid={name} className="mt-2 text-start">
  //         <Form.Label data-testid={name + '-label'}>{label}</Form.Label>
  //         <DatePicker
  //           // ref={inputRef}
  //           size="small"
  //           data-testid={name + '-field'} 
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
  //     <ReportInputErrorDisplay name={errorDisplayControlName} forInputName={name} /> 
  // </div>
  <View>
      <Text>{label}</Text>
      <Button
        onPress={() => setShow(true)} 
        disabled={disabled}
      >{displayDate || placeholder}</Button>
      {show && (
        <DateTimePicker
          value={field.value ? new Date(field.value) : new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          disabled={disabled}
        />
      )}
      {meta.touched && meta.error && <ReportInputErrorDisplay name={name + "ErrorDisplay"} forInputName={name} />}
    </View>
  );
};
   