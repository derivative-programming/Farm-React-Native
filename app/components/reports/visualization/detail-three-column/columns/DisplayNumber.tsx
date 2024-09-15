import React, { FC, ReactElement,} from "react";

import { Text, View, StyleSheet } from 'react-native';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";

export interface ReportColumnDisplayNumberProps {
  forColumn:string
  label:string
  rowIndex?: number
  value: number
  isVisible?:boolean
  conditionallyVisible?:boolean
}

export const ReportColumnDisplayNumber: FC<ReportColumnDisplayNumberProps> = ({
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

  const formatNumber = () => {
    let result:string = "";

    try {

      if(value === null || !displayValue)
      {
          return result;
      }

      if(isNaN(value))
      {
          return result;
      }

      result = value.toLocaleString("en-US");

    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayNumber');
    }
    return result;
  }

  if (!displayValue) return null;

  return (
    <View data-testid={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      <ReportColumnDisplayValue name={valueName} text={formatNumber()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center'

  },
});