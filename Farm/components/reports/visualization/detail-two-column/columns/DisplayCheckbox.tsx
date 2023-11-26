import React, { FC, ReactElement,} from "react";
import { View,  Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 
   
export interface ReportColumnDisplayCheckboxProps {
  forColumn:string 
  isChecked: boolean 
  label:string
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayCheckbox: FC<ReportColumnDisplayCheckboxProps> = ({
  forColumn, 
  isChecked, 
  label,
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 
 
  const groupName = forColumn +'-column';
  const checkboxName = groupName +'-checkbox';
  
  const displayValue = (isVisible && conditionallyVisible);

  if (!displayValue) return null;
 
  if(isChecked === null || !isVisible){
    return (
    
    //   <Col data-testid={groupName} lg="5" md="5" xs="12" hidden={!displayValue}>
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold">{label}</div> 
    //             &nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <View testID={groupName}>
        <Text>
          {label}
        </Text>  
    </View>
    );
  } else {  
    return ( 
    // <Col data-testid={groupName} lg="6" md="6" xs="12">
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold">{label}</div>
    //             <Form.Check 
    //               readOnly={true}
    //               type="checkbox"
    //               data-testid={checkboxName}
    //               id={checkboxName}
    //               name={checkboxName} 
    //               checked={isChecked}
    //               />
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <View testID={groupName}>
        <Text>
          {label}  
        </Text>
        {isChecked ? (
          <Icon name="check-circle" size={30} color="#4CAF50" />
        ) : (
          <Icon name="radio-button-unchecked" size={30} color="#000000" />
        )} 
    </View>
    );
  }
};
   