import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { StyleSheet } from 'react-native';
import * as RouteNames from './constants/routeNames';
import * as Screens from './screens'; 
import RootStackParamList from './screens/rootStackParamList';
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = (): React.ReactElement => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={RouteNames.TAC_LOGIN}> 
          
        {/*//GENLOOPObjectStart*/}
        {/*//GENTrainingBlock[c2]Start*/}
        {/*//GENLearn[modelType=object,name=Land]Start*/}
        {/*//GENLOOPReportStart*/}
        {/*//GENTrainingBlock[d2]Start*/}
        {/*//GENLearn[modelType=report,name=LandPlantList]Start*/}
          <Stack.Screen name={RouteNames.LAND_PLANT_LIST} component={Screens.LandPlantListScreen} /> 
        {/*//GENLearn[modelType=report,name=LandPlantList]End*/}
        {/*//GENTrainingBlock[d2]End*/}
        {/*//GENLOOPReportEnd*/}
        {/*//GENLearn[modelType=object,name=Land]End*/} 

          <Stack.Screen name={RouteNames.PAC_USER_DATE_GREATER_THAN_FILTER_LIST} component={Screens.PacUserDateGreaterThanFilterListScreen} />

          <Stack.Screen name={RouteNames.PAC_USER_FLAVOR_LIST} component={Screens.PacUserFlavorListScreen} />

          <Stack.Screen name={RouteNames.PAC_USER_LAND_LIST} component={Screens.PacUserLandListScreen} />

          <Stack.Screen name={RouteNames.PAC_USER_ROLE_LIST} component={Screens.PacUserRoleListScreen} />

          <Stack.Screen name={RouteNames.PAC_USER_TAC_LIST} component={Screens.PacUserTacListScreen} />

          <Stack.Screen name={RouteNames.PAC_USER_TRI_STATE_FILTER_LIST} component={Screens.PacUserTriStateFilterListScreen} />

          <Stack.Screen name={RouteNames.PLANT_USER_DETAILS} component={Screens.PlantUserDetailsScreen} />

          <Stack.Screen name={RouteNames.TAC_FARM_DASHBOARD} component={Screens.TacFarmDashboardScreen} />
        {/*//GENTrainingBlock[c2]End*/}
        {/*//GENLOOPObjectEnd*/}

        {/*//GENLOOPObjectStart*/}
        {/*//GENTrainingBlock[a2]Start*/}
        {/*//GENLearn[modelType=object,name=Land]Start*/}
        {/*//GENLOOPObjectWorkflowStart*/}
        {/*//GENTrainingBlock[b2]Start*/}
        {/*//GENLearn[modelType=objectWorkflow,name=LandAddPlant,calculatedIsPage=true]Start*/}
          <Stack.Screen name={RouteNames.LAND_ADD_PLANT} component={Screens.LandAddPlantScreen} /> 
        {/*//GENLearn[modelType=objectWorkflow,name=LandAddPlant,calculatedIsPage=true]End*/}
        {/*//GENTrainingBlock[b2]End*/}
        {/*//GENLOOPObjectWorkflowEnd*/}
        {/*//GENLearn[modelType=object,name=Land]End*/} 

          <Stack.Screen name={RouteNames.TAC_LOGIN} component={Screens.TacLoginScreen} />

          <Stack.Screen name={RouteNames.TAC_REGISTER} component={Screens.TacRegisterScreen} />
        {/*//GENTrainingBlock[a2]End*/}
        {/*//GENLOOPObjectEnd*/}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
 
export default App