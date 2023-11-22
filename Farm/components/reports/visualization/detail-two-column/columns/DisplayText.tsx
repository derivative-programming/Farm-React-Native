import React, { FC, ReactElement,} from "react";
import { Box, Text, VStack } from 'native-base';
import "../../../../../App.scss"; 
   
export interface ReportColumnDisplayTextProps {
  forColumn:string 
  value: string 
  label:string
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayText: FC<ReportColumnDisplayTextProps> = ({
  forColumn, 
  value,
  label,
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column';
  
  const displayValue = (isVisible && conditionallyVisible);
      
  const formatText = () => {  
    let result:string = "";
    
    try {
      
      if(value === null || value === "" || !isVisible)
      {
          return result;
      }
    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayText');
    }
    
    return value;
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
    //             {formatText()}&nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <Box testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <VStack space={2} /* Adjust styling as needed */>
        <Text fontWeight="bold">
          {label}
        </Text>
        <Text>
          {formatText()} {/* Ensure the function works correctly in React Native */}
        </Text>
      </VStack>
    </Box>
  );
};
   