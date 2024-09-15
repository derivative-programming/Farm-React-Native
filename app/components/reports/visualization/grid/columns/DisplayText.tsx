import React, { FC, ReactElement,} from "react";

import { Text, View, StyleSheet } from 'react-native';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";

export interface ReportColumnDisplayTextProps {
  forColumn:string
  label:string
  rowIndex?: number
  value: string
  isVisible?:boolean
  conditionallyVisible?:boolean
}

export const ReportColumnDisplayText: FC<ReportColumnDisplayTextProps> = ({
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

  const formatText = () => {
    let result:string = "";

    try {

      if(value === null || value === "" || !displayValue)
      {
          return result;
      }
    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayText');
    }

    return value;
  }

  if (!displayValue) return null;

  return (
    <View data-testid={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      <ReportColumnDisplayValue name={valueName} text={formatText()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
});