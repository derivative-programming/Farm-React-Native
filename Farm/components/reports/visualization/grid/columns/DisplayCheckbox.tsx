import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import { Box, Checkbox } from 'react-native';
   
export interface ReportColumnDisplayCheckboxProps {
  forColumn:string
  rowIndex: number
  isChecked: boolean 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayCheckbox: FC<ReportColumnDisplayCheckboxProps> = ({
  forColumn,
  rowIndex,
  isChecked, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 
 
  const groupName = forColumn +'-column-' + rowIndex.toString();
  const checkboxName = groupName +'-checkbox';
  
  const displayValue = (isVisible && conditionallyVisible);
  
  if (!isVisible) return null;
 
  if(isChecked === null || !displayValue){ 
    return (
    <td data-testid={groupName}></td>
    );
  } else {  
    return (
      // <td data-testid={groupName} hidden={!isVisible}>   
      //     <Form.Check 
      //       readOnly={true}
      //       type="checkbox"
      //       data-testid={checkboxName}
      //       id={checkboxName}
      //       name={checkboxName} 
      //       checked={isChecked}
      //       />
      // </td>
      <Box testID={groupName} /* Additional styling can be added here */>
        <Checkbox
          value={checkboxName}
          testID={checkboxName}
          isChecked={isChecked}
          isDisabled={true} // Makes the checkbox read-only
          /* Additional styling for checkbox */
        />
      </Box>
    );
  }
};
   