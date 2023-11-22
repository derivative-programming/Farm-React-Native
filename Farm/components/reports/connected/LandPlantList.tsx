import React, {
  FC,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Button, Card, Breadcrumb, Container, View, Text } from "native-base";

import { useNavigation } from '@react-navigation/native';
import ReportFilterLandPlantList from "../filters/LandPlantList";
import { ReportGridLandPlantList } from "../visualization/grid/LandPlantList";
import { ReportDetailThreeColLandPlantList } from "../visualization/detail-three-column/LandPlantList";
import { ReportDetailTwoColLandPlantList } from "../visualization/detail-two-column/LandPlantList";
import * as ReportService from "../services/LandPlantList";
import * as InitReportService from "../services/init/LandPlantListInitReport";
import HeaderLandPlantList from "../headers/LandPlantListInitReport";
import * as ReportInput from "../input-fields";
import { PlusCircle, ArrowLeft } from "react-bootstrap-icons";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB"; 
import uuid from 'react-native-uuid';
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
 
export interface ReportProps {
  landCode:string; 
}

export const ReportConnectedLandPlantList: FC<ReportProps> = ({
  landCode = "00000000-0000-0000-0000-000000000000" 
}): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [initPageResponse, setInitPageResponse] = useState(
    new InitReportService.InitResultInstance()
  );
  const [queryResult, setQueryResult] = useState(
    new ReportService.QueryResultInstance()
  );
  const [query, setQuery] = useState(new ReportService.QueryRequestInstance());
  const [exportQuery, setExportQuery] = useState(new ReportService.QueryRequestInstance());
  const [initialValues, setInitialValues] = useState(
    new ReportService.QueryRequestInstance()
  );
  const isInitializedRef = useRef(false);
  const { logClick } = useAnalyticsDB();

  const isRefreshButtonHidden = false;
  const isPagingAvailable = true;
  const isExportButtonsHidden = false;
  const isFilterSectionHidden = false;
  const isFilterSectionCollapsable = true;
  const isBreadcrumbSectionHidden = false;
  const isButtonDropDownAllowed = false;

  const navigation = useNavigation<ScreenNavigationProp>();
  
  
  const contextCode: string = landCode ?? "00000000-0000-0000-0000-000000000000";
  
  const displayItem:ReportService.QueryResultItem = queryResult.items.length > 0 ?  queryResult.items[0] : new ReportService.QueryResultItemInstance();

  // console.log('report ctrl initial values...');
  // console.log(initialValues);

  const handleInit = (responseFull: any) => {
    const response: InitReportService.InitResult = responseFull.data;

    if (!response.success) {
      return;
    }
    setInitPageResponse({ ...response });
  };

  const handleQueryResults = (responseFull: any) => {
    const queryResult: ReportService.QueryResult = responseFull.data;

    if (!queryResult.success) {
      return;
    }
    setQueryResult({ ...queryResult });
  };
  
  const handleExportQueryResults = (responseFull: any) => {
    const queryResult: ReportService.QueryResult = responseFull.data;

    if (!queryResult.success) {
      return;
    } 
  };

  const onSubmit = (queryRequest: ReportService.QueryRequest) => {
    logClick("ReportConnectedLandPlantList","search","");
    setQuery({ ...queryRequest });
  };

  const onPageSelection = (pageNumber: number) => {
    logClick("ReportConnectedLandPlantList","selectPage",pageNumber.toString());
    setQuery({ ...query, pageNumber: pageNumber });
  };

  const onPageSizeChange = (pageSize: number) => {
    logClick("ReportConnectedLandPlantList","pageSizeChange",pageSize.toString());  
    AsyncStorage.setItem("pageSize",pageSize.toString());
    setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
  };

  const onNavigateTo = (page: string,targetContextCode:string) => { 
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const navigateTo = (page: string, codeName: string) => { 
    let targetContextCode = contextCode;
    Object.entries(initPageResponse).forEach(([key, value]) => {
      if (key === codeName) {
        if (value !== "" && value !== "00000000-0000-0000-0000-000000000000") {
          targetContextCode = value;
        } else {
          return;
        }
      }
    });  
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const onRefreshRequest = () => {
    logClick("ReportConnectedLandPlantList","refresh","");
    setQuery({ ...query });
  };

  const onSort = (columnName: string) => { 
    logClick("ReportConnectedLandPlantList","sort",columnName);
    let orderByDescending = false;
    if (query.OrderByColumnName === columnName) {
      orderByDescending = !query.OrderByDescending;
    }
    setQuery({
      ...query,
      OrderByColumnName: columnName,
      OrderByDescending: orderByDescending,
    });
  };

  
  const onExport = () => {   
    logClick("ReportConnectedLandPlantList","export","");
    if(isProcessing){
      return;
    } 
    setExportQuery({ ...query });
  };

  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;
    ReportService.initPage(contextCode).then((response) =>
      handleInit(response)
    );
  }, []);

  useEffect(() => {
    const newInitalValues = ReportService.buildQueryRequest(initPageResponse); 
    setInitialValues({ ...newInitalValues });
  }, [initPageResponse]);

  useEffect(() => {
    if (JSON.stringify(initialValues) !== JSON.stringify(query)) { 
      let pageSize = AsyncStorage.getItem("pageSize");
      if(pageSize !== null)
      { 
        initialValues.ItemCountPerPage = parseInt(pageSize);
      }
      setQuery({ ...initialValues });
    }
  }, [initialValues]);

  useEffect(() => { 
    setIsProcessing(true);
    ReportService.submitRequest(query, contextCode).then((response) =>
      handleQueryResults(response)
    )
    .finally(() => {setIsProcessing(false);});
  }, [query]);
  
  useEffect(() => {   
    if (!isInitializedRef.current) {
      return;
    } 
    if(!queryResult.success){
      return;
    }
    setIsProcessing(true); 
    ReportService.submitCSVRequest(query, contextCode).then((response) => { 
      //handleExportQueryResults(response);
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'LandPlantList-' + uuid.v4() + '.csv');
      document.body.appendChild(link);
      link.click();
    })
    .finally(() => {setIsProcessing(false);});
  }, [exportQuery]);

  return (
    <View
      className="d-flex flex-column align-items-center h-90vh pb-2 pl-3 pr-3 "
      testID="reportConnectedLandPlantList"
    > 
       
       
      <Card
        className="mt-1 page-card report-card"
         
      > 
      
        <Text testID="page-title-text">Plant List</Text>
        <Text testID="page-intro-text">A list of plants on the land</Text>
        

        <HeaderLandPlantList  
          name="headerLandPlantList"
          initData={initPageResponse}
          isHeaderVisible={true}
        />


          
        <View className="col-12 d-flex flex-column flex-md-row justify-content-between">
          <View className="mb-2 mb-md-0">
            <ReportInput.ReportInputButton name="back-button"
              onPress={() => {
                  logClick("ReportConnectedLandPlantList","back","");
                  navigateTo("TacFarmDashboard", "tacCode");
              }}
              buttonText={<><ArrowLeft className="mb-1"/> Farm Dashboard</>}
              isButtonCallToAction={false}
              isVisible={true}
              isEnabled={true}
            /> 
          </View>
          <View className="d-flex flex-column flex-md-row">
            <View className="mb-2 mb-md-0">
              <ReportInput.ReportInputButton name="otherAddButton"
                onPress={() => {
                  logClick("ReportConnectedLandPlantList","otherAddButton","");
                  navigateTo("LandAddPlant", "landCode");
                }}
                buttonText="Other Add Button"
                isButtonCallToAction={false}
                isVisible={true}
                isEnabled={true}
              />
            </View>
            <View>
              <ReportInput.ReportInputButton name="add-button"
                onPress={() => {
                  logClick("ReportConnectedLandPlantList","add","");
                  navigateTo("LandAddPlant", "landCode");
                }}
                buttonText={<><PlusCircle className="mb-1"/> Add A Plant</>}
                className="ms-md-2"
                isButtonCallToAction={true}
                isVisible={true}
                isEnabled={true}
              />
            </View>
          </View>
        </View> 
        
        

        {/*//GENTrainingBlock[visualizationType]Start*/}
        {/*//GENLearn[visualizationType=Grid]Start*/}
        <ReportFilterLandPlantList
          name="reportConnectedLandPlantList-filter"
          initialQuery={initialValues}
          onSubmit={onSubmit}
          isCollapsible={isFilterSectionCollapsable}
          hidden={isFilterSectionHidden} 
        />

        <View
          className="d-flex w-100  justify-content-end"
          hidden={
            !isFilterSectionHidden ||
            (isFilterSectionHidden && isRefreshButtonHidden)
          }
        >
          <Button
            testID="refresh-button"
            className="ms-2 mt-3" 
            onPress={onRefreshRequest}
            hidden={
              !isFilterSectionHidden ||
              (isFilterSectionHidden && isRefreshButtonHidden)
            }
          >
            Refresh
          </Button> 
        </View>
        

        <ReportGridLandPlantList
          isSortDescending={queryResult.orderByDescending}
          items={queryResult.items}
          name="reportConnectedLandPlantList-table"
          contextCode={contextCode}
          onSort={onSort}
          onExport={onExport}
          onNavigateTo={onNavigateTo}
          onRefreshRequest={onRefreshRequest}
          sortedColumnName={queryResult.orderByColumnName}
          currentPage={queryResult.pageNumber}
          onPageSelection={onPageSelection}
          onPageSizeChange={onPageSizeChange}
          pageSize={queryResult.itemCountPerPage}
          totalItemCount={queryResult.recordsTotal}
          showPagingControls={isPagingAvailable}
          showExport={!isExportButtonsHidden}
          showProcessing={isProcessing}
        />
        {/*//GENLearn[visualizationType=Grid]End*/}
        {/*//GENTrainingBlock[visualizationType]End*/}

      </Card> 
      
    </View>
  );
};
export default ReportConnectedLandPlantList;
