import React, { FC, ReactElement } from "react";
import { Button } from "native-base";
import "../../../App.scss"; 
   
export interface FormInputButtonProps {
  name: string
  buttonText: string
  onPress(): void
  isButtonCallToAction?:boolean 
  isVisible?:boolean
  isEnabled?:boolean
  autoFocus?:boolean
  className?:string
}
   
export const FormInputButton: FC<FormInputButtonProps> = ({
  name,
  buttonText,
  onPress,
  isButtonCallToAction = true, 
  isVisible = true,
  isEnabled = true,
  autoFocus = false,
  className = ""
}): ReactElement => { 
  
  let buttonVariant = "secondary";
  if(isButtonCallToAction)
  {
    buttonVariant = "primary";
  }

      
  return (
    <Button testID={name}
        id={name}
        onPress={onPress}
        style={{ display: isVisible ? 'flex' : 'none' }}
        disabled={!isEnabled} 
        isFocused={autoFocus} 
        variant={buttonVariant}>
        {buttonText}
    </Button>
  );
};
   