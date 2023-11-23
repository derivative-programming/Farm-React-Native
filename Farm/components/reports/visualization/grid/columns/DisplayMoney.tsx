import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import { Text } from 'react-native';
   
export interface ReportColumnDisplayMoneyProps {
  forColumn:string
  rowIndex: number
  value: number 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayMoney: FC<ReportColumnDisplayMoneyProps> = ({
  forColumn,
  rowIndex,
  value, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  
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
    // <td data-testid={groupName} className="text-nowrap" hidden={!isVisible}>{formatMoney()}</td>
    <Text testID={groupName} /* Add additional styling for text-nowrap equivalent */>
      {formatMoney()} {/* Ensure this function is suitable for React Native */}
    </Text>
  );
};
   