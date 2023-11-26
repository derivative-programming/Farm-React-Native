import React, { FC, ReactElement,} from "react"; 
 
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
   
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
    // <HStack id={groupName} testID={groupName} space={3} px="3" mt="3">
    //   <Box testID={forColumn + '-header'}>
    //     {/* Content for the div */}
    //   </Box>
    //   {displayValue && (
    //     <Button
    //       testID={buttonName}
    //       onPress={onPress}
    //       variant={buttonVariant} // Adjust this according to NativeBase's API
    //       size="sm" // Adjust size if necessary
    //     >
    //       {buttonText}
    //     </Button>
    //   )}
    // </HStack>
    <View style={styles.horizontalStack} id={groupName} testID={groupName}>
      <View testID={forColumn + '-header'}> 
      </View>
      {displayValue && (
        <TouchableOpacity 
          onPress={onPress} 
          style={styles.button}
          testID={buttonName}
        >
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
   
const styles = StyleSheet.create({
  horizontalStack: {
    flexDirection: 'row', // HStack equivalent
    paddingHorizontal: 12, // px="3" equivalent, assuming 1 unit = 4
    marginTop: 12, // mt="3" equivalent
    alignItems: 'center', // For vertical alignment
    // Add other styles as needed
  },
  button: {
    // Add button styling here, adjust size as needed
  },
  // Define other styles as needed
});
