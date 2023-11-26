import React, { FC, ReactElement } from "react";   
export interface ReportColumnHeaderProps {
  name?: string;
  forColumn: string;
  label: string;
  sortedColumnName: string;
  isSortDescending: boolean;
  onSort(columnName: string): void;
  isVisible?: boolean;
}

export const ReportColumnHeader: FC<ReportColumnHeaderProps> = ({
  name = "",
  forColumn,
  label,
  sortedColumnName,
  isSortDescending,
  onSort,
  isVisible = true,
}): ReactElement => {
  const controlName = name.length > 0 ? name : { forColumn } + "ColumnHeader";

  return (
    <th className="cursor-pointer text-nowrap ps-2 pe-2"
      testID={forColumn + '-header'}
      id={forColumn + '-header'}
      style={{ display: isVisible ? 'flex' : 'none' }}
      onPress={() => onSort(forColumn)}
    >
      {label}{" "}
      <span>
        {" "} 
        {sortedColumnName === forColumn && !isSortDescending && isVisible ? ( 
            <SortDownAlt className="w-12 ms-1"  
              testID={forColumn + '-header-sortDown'} 
            />
        ) : null}
        
        {sortedColumnName === forColumn && isSortDescending && isVisible ? ( 
            <SortUp className="w-12 ms-1"
              testID={forColumn + '-header-sortUp'} 
            />
        ) : null}
      </span>
    </th>
  );
};
