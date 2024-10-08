import React, { FC, ReactElement,} from "react";

import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ReportColumnDisplayLabel } from "./DisplayLabel";

export interface ReportColumnDisplayCheckboxProps {
  forColumn:string
  label:string
  rowIndex?: number
  isChecked: boolean
  isVisible?:boolean
  conditionallyVisible?:boolean
  isPreferenceVisible?: boolean;
}

export const ReportColumnDisplayCheckbox: FC<ReportColumnDisplayCheckboxProps> = ({
  forColumn,
  label,
  rowIndex = 0,
  isChecked,
  isVisible = true,
  conditionallyVisible = true,
  isPreferenceVisible = true,
}): ReactElement | null => {

  const groupName = forColumn +'-column-' + rowIndex.toString();
  const checkboxName = groupName +'-checkbox';
  const labelName = groupName +'-label';

  const displayValue = (isVisible && conditionallyVisible && isPreferenceVisible);

  if (!displayValue) return null;

  if(isChecked === null || !displayValue){
    return (
    <View data-testid={groupName}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
    </View>
    );
  } else {
    return (
      <View testID={groupName} style={styles.container}>
        <ReportColumnDisplayLabel name={labelName} text={label}  />
        {isChecked ? (
          <Icon name="checkbox-outline" size={30} color="#4CAF50"  style={styles.checkbox}/>
        ) : (
          <Icon name="square-outline" size={30} color="#000000"  style={styles.checkbox}/>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
  checkbox: {
    marginBottom: 20,

  },
});