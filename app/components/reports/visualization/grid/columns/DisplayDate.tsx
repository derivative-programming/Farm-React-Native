import React, { FC, ReactElement,} from "react";

import moment from "moment";
import { Text, View, StyleSheet } from 'react-native';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";

export interface ReportColumnDisplayDateProps {
  forColumn:string
  label:string
  rowIndex?: number
  value: string
  isVisible?:boolean
  conditionallyVisible?:boolean
  isPreferenceVisible?: boolean;
}

export const ReportColumnDisplayDate: FC<ReportColumnDisplayDateProps> = ({
  forColumn,
  label,
  rowIndex = 0,
  value,
  isVisible = true,
  conditionallyVisible = true,
  isPreferenceVisible = true,
}): ReactElement | null => {

  const groupName = forColumn +'-column-' + rowIndex.toString();
  const labelName = groupName +'-label';
  const valueName = groupName +'-value';

  const displayValue = (isVisible && conditionallyVisible && isPreferenceVisible);

  const formatDate = () => {
    let result:string = "";

    try {

      if(value === null || !displayValue)
      {
          return result;
      }

      const dateTime:moment.Moment = moment.utc(value).local();

      if(!dateTime.isValid()){
        return result;
      }

      if(dateTime.format("MM-DD-YYYY") === "12-31-1752"){
        return result;
      }

      result = moment.utc(value).local().format("M/D/YYYY");

    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayDate');
    }

    return result;
  }

  if (!displayValue) return null;

  return (
    <View data-testid={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      <ReportColumnDisplayValue name={valueName} text={formatDate()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
});