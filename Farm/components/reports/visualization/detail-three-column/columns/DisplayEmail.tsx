import React, { FC, ReactElement,} from "react"; 
 
import { Box, Text } from 'react-native';
   
export interface ReportColumnDisplayEmailProps {
  forColumn:string 
  value: string 
  label:string
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayEmail: FC<ReportColumnDisplayEmailProps> = ({
  forColumn, 
  value, 
  label,
  isVisible = true,
  conditionallyVisible = true
}): ReactElement | null => { 

  const groupName = forColumn;
  
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
    // <Col data-testid={groupName} lg="6" md="6" xs="12" hidden={!isVisible}>
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold" data-testid={groupName + '-header'}>{label}</div>
    //             {formatEmail()}&nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <Box testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <Text fontWeight="bold" testID={groupName + '-header'}>
        {label}
      </Text>
      <Text>
        {formatEmail()} 
      </Text>
    </Box>
  );
};
   