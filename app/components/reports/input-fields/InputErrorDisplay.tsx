import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik';
import {ErrorDisplay } from './ErrorDisplay';
import { View } from 'react-native';
   
export interface ReportInputErrorDisplayProps {
  name: string,
  forInputName: string,
}
   
export const ReportInputErrorDisplay: FC<ReportInputErrorDisplayProps> = ({
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