import React, { FC, ReactElement,} from "react";
import { Box, Text, VStack } from 'react-native';
 
import moment from "moment";
   
export interface ReportColumnDisplayDateTimeProps {
  forColumn:string 
  value: string 
  label:string
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayDateTime: FC<ReportColumnDisplayDateTimeProps> = ({
  forColumn, 
  value, 
  label,
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column';
  
  const displayValue = (isVisible && conditionallyVisible);
      
  const formatDateTime = () => {  
    let result:string = "";
    
    try {
        
      if(value === null || !isVisible)
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
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayDateTime.');
    }
    return result;
  }

  if (!displayValue) return null;

  return ( 
    // <Col data-testid={groupName} lg="6" md="6" xs="12" hidden={!displayValue}>
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold">{label}</div>
    //             {formatDateTime()} &nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <View testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <VStack space={2} /* Adjust styling as needed */>
        <Text fontWeight="bold">
          {label}
        </Text>
        <Text>
          {formatDateTime()} {/* Ensure the function works correctly in React Native */}
        </Text>
      </VStack>
    </View>
  );
};
   