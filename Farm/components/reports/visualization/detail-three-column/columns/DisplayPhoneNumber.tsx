import React, { FC, ReactElement,} from "react";
import { Box, Text } from 'react-native';
 
   
export interface ReportColumnDisplayPhoneNumberProps {
  forColumn:string 
  value: string 
  label: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayPhoneNumber: FC<ReportColumnDisplayPhoneNumberProps> = ({
  forColumn, 
  value, 
  label,
  isVisible = true,
  conditionallyVisible = true
}): ReactElement | null => { 

  const groupName = forColumn;
  
  const displayValue = (isVisible && conditionallyVisible);
  
  const formatPhoneNumber = () => { 
    let result:string = "";
    
    try {
        
      if(value === null || value === "" || !displayValue)
      {
          return result;
      }

      value = value.replace(" ", "");

      if (value && value.length === 10) {
          let cleaned = ('' + value).replace(/\D/g, '');
          let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
          if (match) {
              return '(' + match[1] + ') ' + match[2] + '-' + match[3];
          } else {
              return value
          }
      }

      if (value && value.length === 7) {
          let cleaned = ('' + value).replace(/\D/g, '');
          let match = cleaned.match(/^(\d{3})(\d{4})$/);
          if (match) {
              return match[1] + '-' + match[2];
          } else {
              return value;
          }
      }
      
    } catch (error) {
      console.log('Error(' + error + ') with value(' + value + ') typeof(' + typeof value + ') in ReportColummDisplayPhoneNumber');
    }
    
    return value
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
    //             {formatPhoneNumber()}&nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>

    <View testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <Text fontWeight="bold" testID={groupName + '-header'}>
        {label}
      </Text>
      <Text>
        {formatPhoneNumber()} 
      </Text>
    </View>
  );
};
   