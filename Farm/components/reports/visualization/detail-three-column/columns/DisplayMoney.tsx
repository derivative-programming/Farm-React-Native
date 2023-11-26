import React, { FC, ReactElement,} from "react"; 
 
import { Box, Text } from 'react-native';
   
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
  conditionallyVisible = true
}): ReactElement | null => { 

  const groupName = forColumn;
  
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
    // <Col data-testid={groupName} lg="6" md="6" xs="12" hidden={!isVisible}>
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold" data-testid={groupName + '-header'}>{label}</div>
    //             {formatMoney()}&nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <View testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <Text fontWeight="bold" testID={groupName + '-header'}>
        {label}
      </Text>
      <Text>
        {formatMoney()} 
      </Text>
    </View>
  );
};
   