import React, { FC, ReactElement,} from "react";

import { Text, View, StyleSheet } from 'react-native';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";

export interface ReportColumnDisplayEmailProps {
  forColumn:string
  label:string
  rowIndex?: number
  value: string
  isVisible?:boolean
  conditionallyVisible?:boolean
}

export const ReportColumnDisplayEmail: FC<ReportColumnDisplayEmailProps> = ({
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

  const formatEmail = () => {
    let result:string = "";

    try {

      if(value === null || value === "" || !displayValue)
      {
          return result;
      }

      result = value;

    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayEmail');
    }

    return value;
  }

  if (!isVisible) return null;

  return (
    <View data-testid={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      <ReportColumnDisplayValue name={valueName} text={formatEmail()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligns children horizontally

  },
});