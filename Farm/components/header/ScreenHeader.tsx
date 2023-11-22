import { View } from "native-base";
import React, { FC, ReactElement, useContext } from "react";   
import { StyleSheet } from 'react-native';
import { Box, IconButton, HStack, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ScreenHeaderProps { 
}

const ScreenHeader: FC<ScreenHeaderProps> = ({ 
}): ReactElement => { 

  const title = "DemoApp"
   
  return (  
    <Box backgroundColor="primary.500">
      <HStack bg="blue.500" px="1" py="3" alignItems="center" justifyContent="center">
        <IconButton
          icon={<Icon name="menu" size={25} color="white" />}
          onPress={() => console.log('Menu Clicked')}
          style={{ position: 'absolute', left: 0 }}
        />
        <Text color="white" fontSize="20" fontWeight="bold">
          {title}
        </Text> 
      </HStack>
    </Box>
 
  );
}; 
 

export default ScreenHeader;
