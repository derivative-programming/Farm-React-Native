import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader'; 
import { ScreenBackButton } from '../components/ScreenBackButton';
import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
import { ReportConnectedLandPlantList } from '../components/reports/connected';
 
type LandPlantListScreenRouteProp = RouteProp<RootStackParamList, 'LandPlantList'>;
type LandPlantListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LandPlantList'>;

type LandPlantListScreenProps = {
  route: LandPlantListScreenRouteProp;
  navigation: LandPlantListScreenNavigationProp;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const LandPlantListScreen: React.FC<LandPlantListScreenProps> = ({ route }) => { 
  
  const landCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  const navigation = useNavigation<ScreenNavigationProp>();
   

  return ( 
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      >
        <View style={styles.container}> 
          <ScreenHeader />  
          <ReportConnectedLandPlantList landCode={landCode}/> 
        </View>
      </KeyboardAvoidingView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,  
  },
  safeArea: { 
    
  },
});
  
export default LandPlantListScreen;