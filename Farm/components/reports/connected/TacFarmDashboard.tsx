import React, {
  FC,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as TacFarmDashboardReportService from "../services/TacFarmDashboard";
import * as InitReportService from "../services/init/TacFarmDashboardInitReport";
import HeaderTacFarmDashboard from "../headers/TacFarmDashboardInitReport";
import * as ReportInput from "../input-fields";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB";
import uuid from 'react-native-uuid';
import { ScreenAddButton } from "../../ScreenAddButton";  
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenBackButton } from "../../ScreenBackButton";
import * as theme from '../../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons';
//GENTrainingBlock[visualizationTypeImports]Start
//GENLearn[visualizationType=DetailTwoColumn]Start 
import { ReportDetailTwoColTacFarmDashboard } from "../visualization/detail-two-column/TacFarmDashboard";
//GENLearn[visualizationType=DetailTwoColumn]End
//GENTrainingBlock[visualizationTypeImports]End
  
  type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
  export interface ReportProps {
    tacCode:string;
  }
  export const ReportConnectedTacFarmDashboard: FC<ReportProps> = ({
    tacCode = "00000000-0000-0000-0000-000000000000"
  }): ReactElement => {
    const isFilterPersistant  = false;
  
    const [items, setItems] = useState<TacFarmDashboardReportService.EnhancedQueryResultItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [initPageResponse, setInitPageResponse] = useState<InitReportService.InitResult | null>(null);
  
    const [queryResult, setQueryResult] = useState<TacFarmDashboardReportService.QueryResult | null>(null);
  
    const [query, setQuery] = useState<TacFarmDashboardReportService.QueryRequest | null>(null);
  
    const [initialQuery, setInitialQuery] = useState<TacFarmDashboardReportService.QueryRequest | null>(null);
  
    const [displayItem, setDisplayItem] = useState<TacFarmDashboardReportService.QueryResultItem | null>(null);
  
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  
    const isInitializedRef = useRef(false);
    const { logClick } = useAnalyticsDB();
  
      
    //GENTrainingBlock[visualizationTypeInit]Start
    //GENLearn[visualizationType=DetailTwoColumn]Start
    //
    //GENLearn[visualizationType=DetailTwoColumn]End
    //GENTrainingBlock[visualizationTypeInit]End


    //GENTrainingBlock[visualizationTypeFuncs]Start
    //GENLearn[visualizationType=DetailTwoColumn]Start
    //
    //GENLearn[visualizationType=DetailTwoColumn]End
    //GENTrainingBlock[visualizationTypeFuncs]End

  
    const navigation = useNavigation<ScreenNavigationProp>();
    const contextCode: string = tacCode ?? "00000000-0000-0000-0000-000000000000";
  
    const handleInit = (responseFull: InitReportService.ResponseFull) => {
      const response: InitReportService.InitResult = responseFull.data;
  
      if (!response.success) {
        return;
      }
      setInitPageResponse({ ...response });
    };
  
    const handleQueryResults = (responseFull: TacFarmDashboardReportService.ResponseFull) => {
      const queryResult: TacFarmDashboardReportService.QueryResult = responseFull.data;
  
      if (!queryResult.success) {
        return;
      }
      setQueryResult({ ...queryResult });
      const currentItemCount = items.length
      const enhancedItems = queryResult.items.map((item,index) => ({
        ...item,
        rowKey: uuid.v4().toString(), // Add a UUID to each item
        rowNumber: currentItemCount + index
      }));
      console.log('currentPage:' + queryResult.pageNumber);
      if(queryResult.pageNumber == 1) {
        console.log('set items page 1');
        setItems(enhancedItems);
      }
      else{
        console.log('set items page ' + queryResult.pageNumber);
        setItems([...items, ...enhancedItems]);
      }
    };
  
    const onNavigateTo = (page: string,targetContextCode:string) => {
      console.log('onNavigateTo...');
      console.log('page...' + page);
      console.log('targetContextCode...' + targetContextCode);
      navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
    };
  
    const onRefreshRequest = () => {
      logClick("ReportConnectedTacFarmDashboard","refresh","");
  
      const cleanrQueryRequest = new TacFarmDashboardReportService.QueryRequestInstance();
      cleanrQueryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
      cleanrQueryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
      cleanrQueryRequest.OrderByDescending = query?.OrderByDescending ?? false;
      setQuery(cleanrQueryRequest);
    };
  
    useEffect(() => {
      if (isInitializedRef.current) {
        return;
      }
      isInitializedRef.current = true;
      TacFarmDashboardReportService.initPage(contextCode).then((response) =>
        handleInit(response)
      );
    }, []);
  
    useEffect(() => {
      if(initPageResponse === null){
        return;
      }
  
      const loadAsyncData = async () => {
        let queryRequest = TacFarmDashboardReportService.buildQueryRequest(initPageResponse);
  
        // Check if persistence is enabled and if there is a saved filter
        if (isFilterPersistant) {
          const savedFilter = await AsyncStorage.getItem("TacFarmDashboardFilter");
  
          if (savedFilter) {
            const parsedFilter = JSON.parse(savedFilter);
  
            queryRequest = { ...queryRequest, ...parsedFilter };
          }
        }
        setInitialQuery({ ...queryRequest });
      };
  
      loadAsyncData();
  
    }, [initPageResponse]);
  
    useEffect(() => {
      if(initialQuery === null){
        return;
      }
      const loadAsyncData = async () => {
        if (JSON.stringify(initialQuery) !== JSON.stringify(query)) {
          const pageSize = await AsyncStorage.getItem("pageSize");
          if(pageSize !== null)
          {
            initialQuery.ItemCountPerPage = parseInt(pageSize);
          }
          setQuery({ ...initialQuery });
        }
      };
  
      loadAsyncData();
  
    }, [initialQuery]);
  
    useEffect(() => {
      if(query === null){
        return;
      }
  
      console.log('report ctrl query...');
      console.log(query);
  
      if(query.pageNumber == 1) {
        setRefreshing(true);
        setLoadingMore(false);
      } else {
        setRefreshing(false);
        setLoadingMore(true);
      }
  
      setIsProcessing(true);
      TacFarmDashboardReportService.submitRequest(query, contextCode).then((response) =>
        handleQueryResults(response)
      )
      .finally(() => {
        setIsProcessing(false);
        setRefreshing(false);
        setLoadingMore(false);
      });
    }, [query]);
  
    useEffect(() => {
      if(queryResult === null){
        return;
      }
      if(queryResult.items === null){
        return;
      }
  
      const item = queryResult.items.length > 0 ?  queryResult.items[0] : new TacFarmDashboardReportService.QueryResultItemInstance();
  
      setDisplayItem({...item})
    }, [queryResult]);
  
    const navigateTo = (page: string, codeName: string) => {
      console.log('navigateTo...');
      console.log('page...' + page);
      console.log('codeName...' + codeName);
      let targetContextCode = contextCode;
      if(initPageResponse === null){
        return;
      }
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
  
    const isBreadcrumbSectionHidden = false;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <ScreenBackButton name="back-button"
              onPress={async () => {
                await logClick("ReportConnectedTacFarmDashboard","back","");
                navigateTo("", "");
              }}
              buttonText=""
              isVisible={false}
              isEnabled={true}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} testID="page-title-text">Farm Dashboard</Text>
            </View>
            <ScreenAddButton name="add-button"
              onPress={async () => {
                await logClick("ReportConnectedList","add","");
                navigateTo("", "");
              }}
              buttonText=""
              isVisible={false}
              isEnabled={true}
            />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.introText} testID="page-intro-text">Farm Dashboard page intro text</Text>
          
          {initPageResponse && (
            <HeaderTacFarmDashboard
              name="headerTacFarmDashboard"
              initData={initPageResponse}
              isHeaderVisible={false}
            /> 
          )}
          {/*//GENTrainingBlock[visualizationType]Start*/}
          {/*//GENLearn[visualizationType=DetailTwoColumn]Start*/}
          
          <ScrollView>
            {displayItem && (
              <ReportDetailTwoColTacFarmDashboard 
                  item={displayItem}
                  name="reportConnectedTacFarmDashboard-table" 
                  onNavigateTo={onNavigateTo} 
                  onRefreshRequest={onRefreshRequest}
              /> 
            )}
          </ScrollView>
          {/*//GENLearn[visualizationType=DetailTwoColumn]End*/}
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
  safeArea: {
  },
  header: {
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center', // Align items vertically in the center
      // Add padding, margin, or any other styling as needed
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
  },
  titleText: {
    fontSize: theme.fonts.largeSize,
    marginBottom: 8,
    color: theme.Colors.text,
    textAlign: 'center', // Center the text
  },
  introText: {
    fontSize: theme.fonts.mediumSize,
    marginBottom: 8,
    color: theme.Colors.text,
  },
});
export default ReportConnectedTacFarmDashboard;

