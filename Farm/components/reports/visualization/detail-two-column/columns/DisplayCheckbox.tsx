import React, { FC, ReactElement,} from "react";
import { Box, Checkbox, VStack, Text } from 'react-native';
import "../../../../../App.scss"; 
   
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
    <Box testID={groupName} flex={1} /* Adjust for lg/md/xs equivalent */>
      <VStack space={2} /* Adjust styling as needed */>
        <Text fontWeight="bold">
          {label}
        </Text> 
      </VStack>
    </Box>
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
    <Box testID={groupName} flex={1} /* Adjust for lg/md/xs equivalent */>
      <VStack space={2} /* Adjust styling as needed */>
        <Text fontWeight="bold">
          {label}
        </Text>
        <Checkbox
          value={checkboxName}
          testID={checkboxName}
          isChecked={isChecked}
          isReadOnly // If the checkbox is meant to be read-only
        >
          {/* Checkbox label if needed */}
        </Checkbox>
      </VStack>
    </Box>
    );
  }
};
   