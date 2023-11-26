import React, {
  FC,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import ReportFilterLandPlantList from "../filters/LandPlantList";
import { ReportGridLandPlantList } from "../visualization/grid/LandPlantList";
import { ReportDetailThreeColLandPlantList } from "../visualization/detail-three-column/LandPlantList";
import { ReportDetailTwoColLandPlantList } from "../visualization/detail-two-column/LandPlantList";
import * as ReportService from "../services/LandPlantList";
import * as InitReportService from "../services/init/LandPlantListInitReport";
import HeaderLandPlantList from "../headers/LandPlantListInitReport";
import * as ReportInput from "../input-fields"; 
import useAnalyticsDB from "../../../hooks/useAnalyticsDB"; 
import uuid from 'react-native-uuid';
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from '../../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ScreenBackButton } from "../../ScreenBackButton";
import { ScreenAddButton } from "../../ScreenAddButton";

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

  console.log('report ctrl landCode...' + landCode);

  console.log('report ctrl initial values...');
  console.log(initialValues);

  const handleInit = (responseFull: any) => {
    const response: InitReportService.InitResult = responseFull.data;

    if (!response.success) {
      return;
    }
    setInitPageResponse({ ...response });
  };

  const handleQueryResults = (responseFull: any) => {
    const queryResult: ReportService.QueryResult = responseFull.data;
 
    console.log('report ctrl query results...');
    console.log(responseFull);

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

  const onSubmit = async (queryRequest: ReportService.QueryRequest) => {
    await logClick("ReportConnectedLandPlantList","search","");
    setQuery({ ...queryRequest });
  };

  const onPageSelection = async (pageNumber: number) => {
    await logClick("ReportConnectedLandPlantList","selectPage",pageNumber.toString());
    setQuery({ ...query, pageNumber: pageNumber });
  };

  const onPageSizeChange = async (pageSize: number) => {
    await logClick("ReportConnectedLandPlantList","pageSizeChange",pageSize.toString());  
    await AsyncStorage.setItem("pageSize",pageSize.toString());
    setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
  };

  const onNavigateTo = (page: string,targetContextCode:string) => { 
    console.log('onNavigateTo...');
    console.log('page...' + page);
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const navigateTo = (page: string, codeName: string) => { 
    console.log('navigateTo...');
    console.log('page...' + page);
    console.log('codeName...' + codeName);
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
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const onRefreshRequest = async () => {
    await logClick("ReportConnectedLandPlantList","refresh","");
    setQuery({ ...query });
  };

  const onSort = async (columnName: string) => { 
    await logClick("ReportConnectedLandPlantList","sort",columnName);
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

  
  const onExport = async () => {   
    await logClick("ReportConnectedLandPlantList","export","");
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
    const fetchData = async () => {
      if (JSON.stringify(initialValues) !== JSON.stringify(query)) {
          // Use await for AsyncStorage
          let pageSize = await AsyncStorage.getItem("pageSize");
          if (pageSize !== null) {
              initialValues.ItemCountPerPage = parseInt(pageSize);
          }
          setQuery({ ...initialValues });
      }
    };
 
    fetchData();
  }, [initialValues]);

  useEffect(() => { 

    console.log('report ctrl query...');
    console.log(query);

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
      // link.href = url;
      link.setAttribute('download', 'LandPlantList-' + uuid.v4() + '.csv');
      document.body.appendChild(link);
      link.click();
    })
    .finally(() => {setIsProcessing(false);});
  }, [exportQuery]);

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
          <ScreenBackButton name="back-button"
            onPress={async () => {
              await logClick("ReportConnectedLandPlantList","back","");
              navigateTo("TacFarmDashboard", "tacCode");
            }}
            buttonText="Farm Dashboard" 
            isVisible={true}
            isEnabled={true} 
          /> 

          <View style={styles.titleContainer}>
              <Text style={styles.titleText} testID="page-title-text">Plant List</Text>
          </View>
          
          <ScreenAddButton name="add-button"
            onPress={async () => {
              await logClick("ReportConnectedLandPlantList","add","");
              navigateTo("LandAddPlant", "landCode");
            }}
            buttonText="Add A Plant" 
            isVisible={true}
            isEnabled={true}
          /> 
      </View>
      <View style={styles.formContainer}>
       
        <Text style={styles.introText} testID="page-intro-text">A list of plants on the land</Text> 
        

        <HeaderLandPlantList  
          name="headerLandPlantList"
          initData={initPageResponse}
          isHeaderVisible={true}
        />

{/* 
          
        <View className="col-12 d-flex flex-column flex-md-row justify-content-between">
          <View className="mb-2 mb-md-0">
            <ReportInput.ReportInputButton name="back-button"
              onPress={async () => {
                  await logClick("ReportConnectedLandPlantList","back","");
                  navigateTo("TacFarmDashboard", "tacCode");
              }}
              buttonText="<< Farm Dashboard"
              isButtonCallToAction={false}
              isVisible={true}
              isEnabled={true}
            /> 
          </View>
          <View className="d-flex flex-column flex-md-row">
            <View className="mb-2 mb-md-0">
              <ReportInput.ReportInputButton name="otherAddButton"
                onPress={async () => {
                  await logClick("ReportConnectedLandPlantList","otherAddButton","");
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
                onPress={async () => {
                  await logClick("ReportConnectedLandPlantList","add","");
                  navigateTo("LandAddPlant", "landCode");
                }}
                buttonText="+ Add A Plant"
                className="ms-md-2"
                isButtonCallToAction={true}
                isVisible={true}
                isEnabled={true}
              />
            </View>
          </View>
        </View> 
         */}
        

        {/*//GENTrainingBlock[visualizationType]Start*/}
        {/*//GENLearn[visualizationType=Grid]Start*/}
        {/* <ReportFilterLandPlantList
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
        /> */}
        {/*//GENLearn[visualizationType=Grid]End*/}
        {/*//GENTrainingBlock[visualizationType]End*/}

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20, // equivalent to py="5"
    alignItems: 'center'
  },
  header: {
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center', // Align items vertically in the center
      // Add padding, margin, or any other styling as needed
  },
  backButton: {
      paddingLeft: 10,
      // alignSelf: 'flex-start', // Align button to the left
      // flexDirection: 'row',
      
      // Adjust styling as needed
  },
  titleContainer: {
      flex: 1, // Take the remaining space in the row
      justifyContent: 'center', // Center the title horizontally in the remaining space
  },
  placeholder: {
      width: 35, // Adjust to match the width of your back button
      // Height, padding, or any other styling to match the back button
  },
  formContainer: {
    width: '90%',
    // Add other styles as needed
  },
  titleText: {
    fontSize: theme.fonts.largeSize, 
    marginBottom: 8,    
    color: theme.Colors.text, 
    textAlign: 'center', // Center the text
    // Add other styles as needed
  },
  introText: {
    fontSize: theme.fonts.mediumSize, 
    marginBottom: 8,    
    color: theme.Colors.text,
    // Add other styles as needed
  }, 
});


export default ReportConnectedLandPlantList;
