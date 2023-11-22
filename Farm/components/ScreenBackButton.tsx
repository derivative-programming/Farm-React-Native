import React, { FC, ReactElement } from "react";
import { Button } from "native-base"; 
import Icon from 'react-native-vector-icons/Ionicons';

export interface ScreenBackButtonProps {
  name: string; 
  onPress(): void; 
  isVisible?: boolean;
  isEnabled?: boolean;
  className?: string; 
}

export const ScreenBackButton: FC<ScreenBackButtonProps> = ({
  name, 
  onPress, 
  isVisible = true,
  isEnabled = true,
  // type,

  className = "",
}): ReactElement => {

 

  return (
    <Button
      testID={name} 
      id={name}  
      onPress={onPress}
      style={{ display: isVisible ? 'flex' : 'none' }}
      disabled={!isEnabled} 
    >
      <Icon name="arrow-back" size={30} color="blue" />
    </Button>
  );
}; 
