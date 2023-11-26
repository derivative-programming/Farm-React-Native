import React, { FC, ReactElement,} from "react"; 
 
import { Pressable, Text } from 'react-native';
import { Linking, View, StyleSheet } from "react-native";
import { ReportColumnDisplayLabel } from "./DisplayLabel";
import { ReportColumnDisplayValue } from "./DisplayValue";
   
export interface ReportColumnDisplayUrlProps {
  forColumn:string
  label:string
  rowIndex: number
  value: string 
  linkText: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayUrl: FC<ReportColumnDisplayUrlProps> = ({
  forColumn,
  label,
  rowIndex,
  value, 
  linkText, 
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => { 

  const groupName = forColumn +'-column-' + rowIndex.toString();
  const labelName = groupName +'-label';

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
    <View testID={groupName} style={styles.container}>
      <ReportColumnDisplayLabel name={labelName} text={label}  />
      {displayValue && (
        <Pressable onPress={handlePress}>
          <Text /* Add styling to replicate the look of a link */>
            {linkText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
   
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligns children horizontally
    // Styles for the container
  },  
});