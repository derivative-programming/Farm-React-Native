import React, { FC, ReactElement } from "react"; 
import "../../../App.scss";
import {useField } from 'formik';
import {ErrorDisplay } from './ErrorDisplay';
import { View } from "native-base";
   
export interface FormInputErrorDisplayProps {
  name: string,
  forInputName: string,
}
   
export const FormInputErrorDisplay: FC<FormInputErrorDisplayProps> = ({
  name,
  forInputName,
}): ReactElement => {
  const [field, meta, helpers] = useField(forInputName);   

  const errorControlName = forInputName + "Error"
      
  return (
    <View testID={name}> 
      {meta.error && meta.touched ? (
          <ErrorDisplay name={errorControlName} errorCsv={meta.error}/> 
      ) : null}
    </View>
  );
};
   
export default ErrorDisplay;