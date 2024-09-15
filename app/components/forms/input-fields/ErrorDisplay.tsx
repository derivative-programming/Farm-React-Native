import React, { FC, ReactElement } from "react"; 
 
import { View, Text, StyleSheet } from 'react-native';
   
export interface ErrorDisplayProps {
  name:string
  errorCsv?: string  
  errorArray?: string [] 
}
   
export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  name="",
  errorCsv = "",
  errorArray = []
}): ReactElement => { 

  const errorArray2 = errorCsv.split(',');
  const allErrors = errorArray.concat(errorArray2)
      
  return (
    <View testID={name}> 
      {allErrors && allErrors.length > 0 ? ( 
          allErrors.map((item, index) => {
            if (item.length > 0) {
              return (
                <View key={item}><Text style={styles.errorText}>{item}</Text></View>  
              );
            }
            return null;
        })
      ) : null}
    </View>
  );
};
   
const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  },  
  errorText: {
    color: 'red',
    marginBottom: 8,    
    
  },
  
});
export default ErrorDisplay;