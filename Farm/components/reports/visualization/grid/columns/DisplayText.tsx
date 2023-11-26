import React, { FC, ReactElement,} from "react"; 
 
import { Text } from 'react-native';
   
export interface ReportColumnDisplayTextProps {
  forColumn:string
  rowIndex: number
  value: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayText: FC<ReportColumnDisplayTextProps> = ({
  forColumn,
  rowIndex,
  value, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  
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
  
  if (!isVisible) return null;

  return (
    // <td data-testid={groupName} hidden={!isVisible}>{formatText()}</td>
    <Text testID={groupName} /* Add additional styling for text-nowrap equivalent */>
      {formatText()} {/* Ensure this function is suitable for React Native */}
    </Text>
  );
};
   