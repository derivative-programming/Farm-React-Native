import React, { FC, ReactElement } from "react"; 
import {useField } from 'formik';
import {ReportErrorDisplay } from './ErrorDisplay';
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
    <View data-testid={name}> 
      {meta.error && meta.touched ? (
          <ReportErrorDisplay name={errorControlName} errorCsv={meta.error}/> 
      ) : null}
    </View>
  );
};
   