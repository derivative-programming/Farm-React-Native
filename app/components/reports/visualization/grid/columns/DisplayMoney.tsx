import React, { FC, ReactElement,} from "react";

import { Text, View, StyleSheet } from 'react-native';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";

export interface ReportColumnDisplayMoneyProps {
  forColumn:string
  label:string
  rowIndex?: number
  value: number
  isVisible?:boolean
  conditionallyVisible?:boolean
}

export const ReportColumnDisplayMoney: FC<ReportColumnDisplayMoneyProps> = ({
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

  const formatMoney = () => {
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

      result = value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });

    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayMoney');
    }

    return result;
  }

  if (!isVisible) return null;

  return (
    <View data-testid={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      <ReportColumnDisplayValue name={valueName} text={formatMoney()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligns children horizontally

  },
});