import React, { FC, ReactElement,} from "react"; 
 
import { Text } from 'react-native';
   
export interface ReportColumnDisplayEmailProps {
  forColumn:string
  rowIndex: number
  value: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayEmail: FC<ReportColumnDisplayEmailProps> = ({
  forColumn,
  rowIndex,
  value, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  
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
    // <td data-testid={groupName} className="text-nowrap" hidden={!isVisible}>{formatEmail()}</td>
    <Text testID={groupName} /* Add additional styling for text-nowrap equivalent */>
      {formatEmail()} {/* Ensure this function is suitable for React Native */}
    </Text>
  );
};
   