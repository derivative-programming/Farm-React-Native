import React, { FC, ReactElement,} from "react"; 
 
import { Box, VStack, Text, Checkbox } from 'react-native';
   
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
  conditionallyVisible = true
}): ReactElement | null => { 
 
  const groupName = forColumn;
  const checkboxName = groupName +'-checkbox';
  
  const displayValue = (isVisible && conditionallyVisible);
  
  if (!isVisible) return null;
 
  if(isChecked === null || !displayValue){
    return (
    
      <Box testID={groupName} flex={1} /* Adjust flex based on lg/md/xs equivalent */>
        <VStack space={2} /* Adjust styling as needed */>
          <Text fontWeight="bold" testID={groupName + '-header'}>
            {label}
          </Text> 
        </VStack>
      </Box>
    );
  } else {  
    return ( 
      <Box testID={groupName} flex={1} /* Adjust flex based on lg/md/xs equivalent */>
        <VStack space={2} /* Adjust styling as needed */>
          <Text fontWeight="bold" testID={groupName + '-header'}>
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
   