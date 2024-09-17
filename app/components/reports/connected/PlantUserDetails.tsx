import React, {
  FC,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";  
import { useFocusEffect } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as PlantUserDetailsReportService from "../services/PlantUserDetails";
import * as InitReportService from "../services/init/PlantUserDetailsInitReport";
import HeaderPlantUserDetails from "../headers/PlantUserDetailsInitReport";
import * as ReportInput from "../input-fields";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB";
import uuid from 'react-native-uuid';
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenBackButton } from "../../ScreenBackButton";
import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from '../../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons';
//GENTrainingBlock[visualizationTypeImports]Start
//GENLearn[visualizationType=DetailThreeColumn]Start 
import { ReportDetailThreeColPlantUserDetails } from "../visualization/detail-three-column/PlantUserDetails";
//GENLearn[visualizationType=DetailThreeColumn]End
//GENTrainingBlock[visualizationTypeImports]End
  
  
  type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
  export interface ReportProps {
    plantCode:string;
  }
  export const ReportConnectedPlantUserDetails: FC<ReportProps> = ({
    plantCode = "00000000-0000-0000-0000-000000000000"
  }): ReactElement => {
    const isFilterPersistant  = false;
  
    const [items, setItems] = useState<PlantUserDetailsReportService.EnhancedQueryResultItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [initPageResponse, setInitPageResponse] = useState<InitReportService.InitResult | null>(null);
  
    const [queryResult, setQueryResult] = useState<PlantUserDetailsReportService.QueryResult | null>(null);
  
    const [query, setQuery] = useState<PlantUserDetailsReportService.QueryRequest | null>(null);
  
    const [initialQuery, setInitialQuery] = useState<PlantUserDetailsReportService.QueryRequest | null>(null);
  
    const [displayItem, setDisplayItem] = useState<PlantUserDetailsReportService.QueryResultItem | null>(null);
  
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  
    const isInitializedRef = useRef(false);
    const { logClick } = useAnalyticsDB();
   
    //GENTrainingBlock[visualizationTypeInit]Start
    //GENLearn[visualizationType=DetailThreeColumn]Start
    //
    //GENLearn[visualizationType=DetailThreeColumn]End
    //GENTrainingBlock[visualizationTypeInit]End


    //GENTrainingBlock[visualizationTypeFuncs]Start
    //GENLearn[visualizationType=DetailThreeColumn]Start
    //
    //GENLearn[visualizationType=DetailThreeColumn]End
    //GENTrainingBlock[visualizationTypeFuncs]End

  
    const navigation = useNavigation<ScreenNavigationProp>();
    const contextCode: string = plantCode ?? "00000000-0000-0000-0000-000000000000";
  
    const handleInit = (responseFull: InitReportService.ResponseFull) => {
      const response: InitReportService.InitResult = responseFull.data;
  
      if (!response.success) {
        return;
      }
      setInitPageResponse({ ...response });
    };
  
    const handleQueryResults = (responseFull: PlantUserDetailsReportService.ResponseFull) => {
      const queryResult: PlantUserDetailsReportService.QueryResult = responseFull.data;
  
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
        setItems([...enhancedItems]);
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
      logClick("ReportConnectedPlantUserDetails","refresh","");
  
      const cleanrQueryRequest = new PlantUserDetailsReportService.QueryRequestInstance();
      cleanrQueryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
      cleanrQueryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
      cleanrQueryRequest.OrderByDescending = query?.OrderByDescending ?? false;
      setQuery({...cleanrQueryRequest});
    };
  
    useEffect(() => {
      // if (isInitializedRef.current) {
      //   return;
      // }
      // isInitializedRef.current = true;
      // PlantUserDetailsReportService.initPage(contextCode).then((response) =>
      //   handleInit(response)
      // );
    }, []); 
  
    useFocusEffect(
      useCallback(() => {
        // if (!isInitializedRef.current) { 
        //   return;
        // } 
        console.log('useFocusEffect...');
        PlantUserDetailsReportService.initPage(contextCode).then((response) =>
          handleInit(response)
        );
      }, [])
    );
  
    useEffect(() => {
      if(initPageResponse === null){
        return;
      }
  
      const loadAsyncData = async () => {
        let queryRequest = PlantUserDetailsReportService.buildQueryRequest(initPageResponse);
  
        // Check if persistence is enabled and if there is a saved filter
        if (isFilterPersistant) {
          const savedFilter = await AsyncStorage.getItem("PlantUserDetailsFilter");
  
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
        const pageSize = await AsyncStorage.getItem("pageSize");
        if(pageSize !== null)
        {
          initialQuery.ItemCountPerPage = parseInt(pageSize);
        }
        setQuery({ ...initialQuery }); 
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
      PlantUserDetailsReportService.submitRequest(query, contextCode).then((response) =>
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
  
      const item = queryResult.items.length > 0 ?  queryResult.items[0] : new PlantUserDetailsReportService.QueryResultItemInstance();
  
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
              onPress={ () => {
                logClick("ReportConnectedPlantUserDetails","back","");
                navigateTo("LandPlantList", "landCode");
              }}
              buttonText="Plant List"
              isVisible={true}
              isEnabled={true}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} testID="page-title-text">Plant Details</Text>
            </View>
  
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.introText} testID="page-intro-text">Plant Details page intro text</Text>
          
          {initPageResponse && (
            <HeaderPlantUserDetails
              name="headerPlantUserDetails"
              initData={initPageResponse}
              isHeaderVisible={false}
            />
          )}
          {/*//GENTrainingBlock[visualizationType]Start*/}
          {/*//GENLearn[visualizationType=DetailThreeColumn]Start*/}
          {!displayItem && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {displayItem && (
            <ScrollView>
                <ReportDetailThreeColPlantUserDetails 
                    item= {displayItem}
                    name="reportConnectedPlantUserDetails-table" 
                    onNavigateTo={onNavigateTo} 
                    onRefreshRequest={onRefreshRequest}
                    showProcessing={isProcessing}
                /> 
            </ScrollView>
          )}
          {/*//GENLearn[visualizationType=DetailThreeColumn]End*/}
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
  backButton: {
      paddingLeft: 10,
      // alignSelf: 'flex-start', // Align button to the left
      // flexDirection: 'row',
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
    flex: 1,
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
export default ReportConnectedPlantUserDetails;

