import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import { Text } from "native-base";
   
export interface ReportColumnDisplayNumberProps {
  forColumn:string
  rowIndex: number
  value: number 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayNumber: FC<ReportColumnDisplayNumberProps> = ({
  forColumn,
  rowIndex,
  value, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  
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
  
  if (!isVisible) return null;

  return (
    // <td data-testid={groupName} className="text-nowrap" hidden={!isVisible}>{formatNumber()}</td>
    <Text testID={groupName} /* Add additional styling for text-nowrap equivalent */>
      {formatNumber()} {/* Ensure this function is suitable for React Native */}
    </Text>
  );
};
   