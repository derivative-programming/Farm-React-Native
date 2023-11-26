import React, { FC, ReactElement,} from "react"; 
 
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
   
export interface ReportColumnDisplayCheckboxProps {
  forColumn:string 
  isChecked: boolean 
  label:string
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayCheckbox: FC<ReportColumnDisplayCheckboxProps> = ({
  forColumn, 
  isChecked, 
  label,
  isVisible = true,
  conditionallyVisible = true
}): ReactElement | null => { 
 
  const groupName = forColumn;
  const checkboxName = groupName +'-checkbox';
  
  const displayValue = (isVisible && conditionallyVisible);
  
  if (!isVisible) return null;
 
  if(isChecked === null || !displayValue){
    return (
    
      <View testID={groupName}>
        <Text>
          {label}
        </Text>  
      </View>
    );
  } else {  
    return ( 
      <View testID={groupName}>
          <Text>
            {label}  
          </Text>
          {isChecked ? (
            <Icon name="check-circle" size={30} color="#4CAF50" />
          ) : (
            <Icon name="radio-button-unchecked" size={30} color="#000000" />
          )} 
      </View>
    );
  }
};
   