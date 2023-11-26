import React, { FC, ReactElement,} from "react"; 
 
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ReportColumnDisplayLabel } from "./DisplayLabel";
   
export interface ReportColumnDisplayCheckboxProps {
  forColumn:string
  label:string
  rowIndex: number
  isChecked: boolean 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayCheckbox: FC<ReportColumnDisplayCheckboxProps> = ({
  forColumn,
  label,
  rowIndex,
  isChecked, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 
 
  const groupName = forColumn +'-column-' + rowIndex.toString();
  const checkboxName = groupName +'-checkbox';
  const labelName = groupName +'-label';
  
  const displayValue = (isVisible && conditionallyVisible);
  
  if (!isVisible) return null;
 
  if(isChecked === null || !displayValue){ 
    return (
    <View data-testid={groupName}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
    </View>
    );
  } else {  
    return (
      // <td data-testid={groupName} hidden={!isVisible}>   
      //     <Form.Check 
      //       readOnly={true}
      //       type="checkbox"
      //       data-testid={checkboxName}
      //       id={checkboxName}
      //       name={checkboxName} 
      //       checked={isChecked}
      //       />
      // </td>
      <View testID={groupName} style={styles.container}>
        <ReportColumnDisplayLabel name={labelName} text={label}  />
        {isChecked ? (
          <Icon name="checkbox-outline" size={30} color="#4CAF50" />
        ) : (
          <Icon name="square-outline" size={30} color="#000000" />
        )} 
      </View>
    );
  }
};
   
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligns children horizontally
    // Styles for the container
  },  
});