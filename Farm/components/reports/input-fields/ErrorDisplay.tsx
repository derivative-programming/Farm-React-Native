import { View } from "native-base";
import React, { FC, ReactElement } from "react"; 
   
export interface ReportErrorDisplayProps {
  name:string
  errorCsv?: string  
  errorArray?: string [] 
}
   
export const ReportErrorDisplay: FC<ReportErrorDisplayProps> = ({
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
            return (
              <View className="error-message" key={item}>{item}</View>  
          );
        })
      ) : null}
    </View>
  );
};
   