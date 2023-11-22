import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import { Box, Button, HStack } from "native-base";
   
export interface ReportColumnDisplayButtonProps {
  forColumn:string 
  value: string 
  buttonText:string  
  onPress():void
  isVisible?:boolean
  conditionallyVisible?:boolean
  isButtonCallToAction?:boolean
}
   
export const ReportColumnDisplayButton: FC<ReportColumnDisplayButtonProps> = ({
  forColumn, 
  value,
  buttonText, 
  onPress,
  isVisible = true,
  conditionallyVisible = true,
  isButtonCallToAction = false,
}): ReactElement | null => { 

  const groupName = forColumn;
  const buttonName = groupName + '-button'; 
  
  const displayValue = (isVisible && conditionallyVisible);
       
  let buttonVariant = "outline";
  if(isButtonCallToAction)
  {
    buttonVariant = "solid";
  }
  
  if (!isVisible) return null;

  return ( 
    // <Row  className=' mt-3 ms-3 me-3 ' 
    //   id={groupName} data-testid={groupName} hidden={!isVisible}> 
    //   <div data-testid={forColumn + '-header'} ></div>
    //     <Button data-testid={buttonName} 
    //       id={buttonName} 
    //       onPress={onPress} 
    //       className='' 
    //       variant={buttonVariant} 
    //       type="button" 
    //       size="sm"
    //       hidden={!displayValue}>
    //         {buttonText}
    //     </Button> 
    // </Row>
    <HStack id={groupName} testID={groupName} space={3} px="3" mt="3">
      <Box testID={forColumn + '-header'}>
        {/* Content for the div */}
      </Box>
      {displayValue && (
        <Button
          testID={buttonName}
          onPress={onPress}
          variant={buttonVariant} // Adjust this according to NativeBase's API
          size="sm" // Adjust size if necessary
        >
          {buttonText}
        </Button>
      )}
    </HStack>
  );
};
   