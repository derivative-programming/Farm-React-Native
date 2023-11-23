import React, { FC, ReactElement } from "react";
import { Pagination, View, Text, Select } from 'react-native';
 
   
export interface ReportPaginationProps {
  name:string
  currentPage: number  
  totalItemCount: number
  pageSize: number
  currentPageItemCount: number
  onPageSizeChange(pageSize:number): void
  onPageSelection(pageNumber:number): void
  hidden?: boolean
}
   
export const ReportPagination: FC<ReportPaginationProps> = ({
  name,
  currentPage,
  totalItemCount,
  pageSize, 
  currentPageItemCount, 
  onPageSizeChange,
  onPageSelection,
  hidden = false,
}): ReactElement => {  
      
  const isHidden = () => {
    if(totalItemCount === 0 || hidden){
      return true;
    } else {
      return false;
    } 
  }

  const isFirstPageButtonHidden = () => {
    if(isHidden())
    {
      return true;
    }
    if(currentPage < 2){
      return true
    }
    return false;
  }

  const isPreviousPageButtonHidden = () => {
    if(isHidden())
    {
      return true;
    }
    if(currentPage <= 2){
      return true
    }
    return false;
  }
  
  const isNextPageButtonHidden = () => {
    if(isHidden())
    {
      return true;
    }
    if(currentPage >= (getMaxPageCount() - 1)){
      return true
    }
    return false;
  }
  
  const isLastPageButtonHidden = () => {
    if(isHidden())
    {
      return true;
    }
    if(currentPage === getMaxPageCount()){
      return true
    }
    return false;
  }
  
  const getFirstItemIndex = () => {
    if(currentPage === 1) {
      return 1;
    } else {
      return (currentPage - 1) * pageSize + 1;
    }
  };

  const getLastItemIndex = () => {
    const baseCount = (currentPage - 1) * pageSize;
    return baseCount + currentPageItemCount; 
  };

  const getMaxPageCount = () => {
    const baseCount = totalItemCount / pageSize
    if((totalItemCount % pageSize) === 0){
      return baseCount;
    } else {
      return baseCount + 1;
    }
  }
  
  const paginationId = name  + "-pageination";
  const paginationPageSizeSelectId = paginationId  + "-select-page-size";
  const paginationFirstId = paginationId  + "-first";
  const paginationPrevId = paginationId  + "-prev";
  const paginationNextId = paginationId  + "-next";
  const paginationLastId = paginationId  + "-last";
  const paginationCountDisplayId = paginationId  + "-count-display";
  
  const getAvailablePageItems = () => {
    let items: any = [];
    let start = currentPage - 2;
    if(start < 1){
      start = 1;
    }
    let end = currentPage + 2
    if(end > getMaxPageCount()){
      end = getMaxPageCount();
    }
    for (let number = start; number <= end; number++) {
      const paginationPageSelectionId = paginationId + "-select-" + number.toString();
      items.push(
        <Pagination.Item
          id={paginationPageSelectionId}
          key={number}
          active={number === currentPage}
          onPress={() => onPageSelection(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };  


  return (
    <View 
      style={{ display: isHidden() ? 'flex' : 'none' }}
      testID={name} className="d-flex flex-column flex-md-row w-100 align-items-center justify-content-between">
      <View>
        <Text  testID='items-per-page-label'>Items Per Page</Text>
         
      </View>
      <Pagination 
        
        testID={paginationId}
        hidden={isHidden()}>
        <Pagination.First 
          testID={paginationFirstId}
          hidden={isFirstPageButtonHidden()}
          onPress={() => onPageSelection(1)} />
        <Pagination.Prev 
          testID={paginationPrevId}
          hidden={isPreviousPageButtonHidden()} 
          onPress={() => onPageSelection(currentPage - 1)} />
        {getAvailablePageItems()}
        <Pagination.Next  
          testID={paginationNextId}
          hidden={isNextPageButtonHidden()} 
          onPress={() => onPageSelection(currentPage + 1)} />
        <Pagination.Last 
          testID={paginationLastId}
          hidden={isLastPageButtonHidden()}
          onPress={() => onPageSelection(getMaxPageCount())} /> 
      </Pagination>
      <View  
        style={{ display: isHidden() ? 'flex' : 'none' }}
        testID={paginationCountDisplayId}>
        {getFirstItemIndex()}-{getLastItemIndex()} of {totalItemCount} items
      </View>
    </View>
  );
};
   