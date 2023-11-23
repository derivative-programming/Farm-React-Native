import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import "../../../../../index.css"; 
import { Box } from 'react-native';
   
export interface ReportColumnDisplayButtonProps {
  forColumn:string
  rowIndex: number
  value: string 
  buttonText:string
  onPress():void
  isVisible?:boolean
  conditionallyVisible?:boolean
  isButtonCallToAction?:boolean
}
   
export const ReportColumnDisplayButton: FC<ReportColumnDisplayButtonProps> = ({
  forColumn,
  rowIndex,
  value, 
  buttonText,
  onPress,
  isVisible = true,
  conditionallyVisible = true,
  isButtonCallToAction = false,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  const buttonName = groupName + '-button'; 
  
  const displayValue = (isVisible && conditionallyVisible);

  let buttonVariant = "outline";
  if(isButtonCallToAction)
  {
    buttonVariant = "solid";
  }

  if (!isVisible) return null;

  return ( 
    // <td data-testid={groupName} hidden={!isVisible}>
    //     <Button
    //         hidden={!displayValue}
    //         className="ms-2"
    //        variant={buttonVariant} 
    //         data-testid={buttonName}
    //         onPress={onPress}
    //         size="sm"
    //     >{buttonText}</Button>
    // </td>
    <Box testID={groupName} /* Additional styling can be added here */>
      {displayValue && (
        <Button
          testID={buttonName}
          onPress={onPress}
          variant={buttonVariant} // Adjust this according to NativeBase's API
          size="sm" // Adjust size as needed
          // Additional styling for button
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
   