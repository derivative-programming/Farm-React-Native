import React, { FC, ReactElement } from "react";
import { Button } from "native-base"; 

export interface ReportInputButtonProps {
  name: string;
  buttonText: any;
  onPress(): void;
  isButtonCallToAction?: boolean;
  isVisible?: boolean;
  isEnabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export const ReportInputButton: FC<ReportInputButtonProps> = ({
  name,
  buttonText,
  onPress,
  isButtonCallToAction = true,
  isVisible = true,
  isEnabled = true,
  // type,

  className = "",
}): ReactElement => {


  let buttonVariant = "secondary";
  if (isButtonCallToAction) {
    buttonVariant = "primary";
  }

  return (
    <Button
      testID={name} 
      id={name} 
      // type="button"
      onPress={onPress}
      style={{ display: isVisible ? 'flex' : 'none' }}
      disabled={!isEnabled}
      variant={buttonVariant}
    >
      {buttonText}
    </Button>
  );
}; 
