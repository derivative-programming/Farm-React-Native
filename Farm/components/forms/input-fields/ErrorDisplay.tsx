import React, { FC, ReactElement } from "react"; 
 
import { View } from "native-base";
   
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
    <View data-testid={name}> 
      {allErrors && allErrors.length > 0 ? ( 
          allErrors.map((item, index) => {
            return (
              <View key={item}>{item}</View>  
          );
        })
      ) : null}
    </View>
  );
};
   
export default ErrorDisplay;