import React, { FC, ReactElement,} from "react";
import { Box, Text, VStack } from 'react-native';
import "../../../../../App.scss"; 
   
export interface ReportColumnDisplayMoneyProps {
  forColumn:string 
  value: number 
  label:string
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayMoney: FC<ReportColumnDisplayMoneyProps> = ({
  forColumn, 
  value, 
  label,
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column';
  
  const displayValue = (isVisible && conditionallyVisible);
      
  const formatMoney = () => { 
    let result:string = "";
    
    try {
      
      if(value === null || !isVisible)
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

  if (!displayValue) return null;

  return ( 
    // <Col data-testid={groupName} lg="6" md="6" xs="12" hidden={!displayValue}>
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold">{label}</div>
    //             {formatMoney()}&nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <Box testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <VStack space={2} /* Adjust styling as needed */>
        <Text fontWeight="bold">
          {label}
        </Text>
        <Text>
          {formatMoney()} {/* Ensure the function works correctly in React Native */}
        </Text>
      </VStack>
    </Box>
  );
};
   