import React, { FC, ReactElement,} from "react";

import { Text, View, StyleSheet } from 'react-native';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";

export interface ReportColumnDisplayPhoneNumberProps {
  forColumn:string
  label:string
  rowIndex?: number
  value: string
  isVisible?:boolean
  conditionallyVisible?:boolean
}

export const ReportColumnDisplayPhoneNumber: FC<ReportColumnDisplayPhoneNumberProps> = ({
  forColumn,
  label,
  rowIndex = 0,
  value,
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => {

  const groupName = forColumn +'-column-' + rowIndex.toString();
  const labelName = groupName +'-label';
  const valueName = groupName +'-value';

  const displayValue = (isVisible && conditionallyVisible);

  const formatPhoneNumber = () => {
    let result:string = "";

    try {

      if(value === null || value === "" || !displayValue)
      {
          return result;
      }

      value = value.replace(" ", "");

      if (value && value.length === 10) {
          let cleaned = ('' + value).replace(/\D/g, '');
          let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
          if (match) {
              return '(' + match[1] + ') ' + match[2] + '-' + match[3];
          } else {
              return value
          }
      }

      if (value && value.length === 7) {
          let cleaned = ('' + value).replace(/\D/g, '');
          let match = cleaned.match(/^(\d{3})(\d{4})$/);
          if (match) {
              return match[1] + '-' + match[2];
          } else {
              return value;
          }
      }

    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayPhoneNumber');
    }

    return value
  }

  if (!isVisible) return null;

  return (
    <View data-testid={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      <ReportColumnDisplayValue name={valueName} text={formatPhoneNumber()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligns children horizontally

  },
});