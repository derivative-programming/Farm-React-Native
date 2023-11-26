import React, { FC, ReactElement,} from "react"; 
import { Box, Link, Text } from 'react-native';
 
   
export interface ReportColumnDisplayUrlProps {
  forColumn:string 
  value: string 
  label:string
  linkText: string 
  isVisible?:boolean
  conditionallyVisible?:boolean
}
   
export const ReportColumnDisplayUrl: FC<ReportColumnDisplayUrlProps> = ({
  forColumn, 
  value,
  label,
  linkText,
  isVisible = true,
  conditionallyVisible = true
}): ReactElement | null => { 

  const groupName = forColumn;
  
  const displayValue = (isVisible && conditionallyVisible);
  
  if (!isVisible) return null;
        
  return ( 
    // <Col data-testid={groupName} lg="6" md="6" xs="12" hidden={!isVisible}>
    //     <ListGroup.Item
    //         as="li"
    //         className="text-start"
    //     >
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold" data-testid={groupName + '-header'}>{label}</div>
    //             <a href={value} 
    //               hidden={!displayValue}
    //             >
    //                 {linkText}
    //             </a>&nbsp;
    //         </div>

    //     </ListGroup.Item>
    // </Col>
    <View testID={groupName} flex={1} /* Adjust based on lg/md/xs equivalent */>
      <Text fontWeight="bold" testID={groupName + '-header'}>
        {label}
      </Text>
      {displayValue && (
        <Link href={value} _text={{ color: "blue.500" }} /* Adjust styling as needed */>
          {linkText}
        </Link>
      )}
    </View>
  );
};
   