import React, { FC, ReactElement, useState } from "react"; 
import {useField } from 'formik';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import {ReportInputErrorDisplay } from './InputErrorDisplay';
import { View, Text, Button } from 'react-native';
import { Platform } from "react-native";
   
export interface ReportInputDateTimeProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
}
   
export const ReportInputDateTime: FC<ReportInputDateTimeProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
}): ReactElement => {
  const [field, meta, helpers] = useField(name); 
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date'); // 'date' or 'time'

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
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      // Keep the time part of the field value
      const time = moment(field.value).format('HH:mm');
      helpers.setValue(moment(currentDate).format(`YYYY-MM-DDT${time}`));
    } else {
      // Keep the date part of the field value
      const date = moment(field.value).format('YYYY-MM-DD');
      helpers.setValue(moment(currentDate).format(`${date}THH:mm`));
    }
  };

  const displayDate = field.value ? moment(field.value).format('M/D/YYYY h:mm A') : '';

  return (
  //   <div className="">
  //     <Form.Group controlId={name}
  //       data-testid={name} className="mt-2 text-start">
  //         <Form.Label data-testid={name + '-label'}>{label}</Form.Label>
  //         <DatePicker
  //           // ref={inputRef}
  //           size="small"
  //           showTime={true}
  //           format="M/D/YYYY h:mm A"
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
      <Button onPress={() => setShow(true)} disabled={disabled}>
        {displayDate || placeholder} 
      </Button>
      {show && (
        <DateTimePicker
          value={field.value ? new Date(field.value) : new Date()}
          // mode={mode}
          mode="datetime"
          // is24Hour={false}
          display="default"
          onChange={onDateChange}
          disabled={disabled}
        />
      )}
      {meta.touched && meta.error && <ReportInputErrorDisplay name={name + "ErrorDisplay"} forInputName={name} />}
    </View>
  );
};
   