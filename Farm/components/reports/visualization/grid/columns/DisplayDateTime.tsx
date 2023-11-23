import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import moment from "moment";
import { Text } from 'react-native';
   
export interface ReportColumnDisplayDateTimeProps {
  forColumn:string
  rowIndex: number
  value: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayDateTime: FC<ReportColumnDisplayDateTimeProps> = ({
  forColumn,
  rowIndex,
  value, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  
  const displayValue = (isVisible && conditionallyVisible);
      
  const formatDateTime = () => {  
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

      result = moment.utc(value).local().format("M/D/YYYY h:m A");
      
    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayDateTime');
    }
    return result;
  }
  
  if (!isVisible) return null;

  return (
    // <td data-testid={groupName} className="text-nowrap" hidden={!isVisible}>{formatDateTime()}</td>
    <Text testID={groupName} /* Add additional styling for text-nowrap equivalent */>
      {formatDateTime()} {/* Ensure this function is suitable for React Native */}
    </Text>
  );
};
   