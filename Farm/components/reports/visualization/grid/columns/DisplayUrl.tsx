import React, { FC, ReactElement,} from "react"; 
import "../../../../../App.scss"; 
import { Box, Pressable, Text } from "native-base";
import { Linking } from "react-native";
   
export interface ReportColumnDisplayUrlProps {
  forColumn:string
  rowIndex: number
  value: string 
  linkText: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayUrl: FC<ReportColumnDisplayUrlProps> = ({
  forColumn,
  rowIndex,
  value, 
  linkText, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();

  let url = value;
  if(!linkText.toLowerCase().startsWith("http"))
  {
    url = "https://" + url;
  }
  
  const displayValue = (isVisible && conditionallyVisible);
  
  if (!isVisible) return null;
       
  const handlePress = () => {
    Linking.openURL(url); // Make sure the URL is valid
  };
  
  return (
    // <td data-testid={groupName} 
    //   className="text-nowrap" 
    //   hidden={!isVisible}>
    //     <a href={url}
    //       hidden={!displayValue}
    //       target="_blank"
    //       >
    //       {linkText}
    //     </a>
    //   </td>
    <Box testID={groupName} /* Additional styling can be added here */>
      {displayValue && (
        <Pressable onPress={handlePress}>
          <Text /* Add styling to replicate the look of a link */>
            {linkText}
          </Text>
        </Pressable>
      )}
    </Box>
  );
};
   