import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
   
export interface ReportColumnDisplayButtonProps {
  forColumn:string 
  value: string 
  buttonText:string  
  onPress():void
  isVisible?:boolean
  isEnabled?: boolean;
  conditionallyVisible?:boolean
  isButtonCallToAction?:boolean
}
   
export const ReportColumnDisplayButton: FC<ReportColumnDisplayButtonProps> = ({
  forColumn,  
  buttonText, 
  onPress,
  isVisible = true,
  isEnabled = true,
  conditionallyVisible = true,
  isButtonCallToAction = false,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-0';
  const buttonName = groupName + '-button'; 
  
  const displayValue = (isVisible && conditionallyVisible);
       
  let buttonVariant = "outline";
  if(isButtonCallToAction)
  {
    buttonVariant = "solid";
  }

  if (!displayValue) return null;

  return ( 
    // <div>
    //   <Button 
    //     data-testid={buttonName} 
    //     id={buttonName} 
    //     onPress={onPress} 
    //     className='' 
    //     variant={buttonVariant} 
    //     disabled={!isEnabled} 
    //     type="button" hidden={!displayValue}>
    //       {buttonText}
    //   </Button>
    // </div>
    <Button
      testID={buttonName}
      onPress={onPress}
      variant={buttonVariant} // Adjust this according to NativeBase's API
      isDisabled={!isEnabled}
      // Additional styling can be added here
    >
      {buttonText}
    </Button>
  );
}; 
   