import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import ScreenHeader from '../components/header/ScreenHeader'; 
import { FormConnectedLandAddPlant } from '../components/forms/connected';
 

type LandAddPlantScreenRouteProp = RouteProp<RootStackParamList, 'LandAddPlant'>;
type LandAddPlantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LandAddPlant'>;

type LandAddPlantScreenProps = {
  route: LandAddPlantScreenRouteProp;
  navigation: LandAddPlantScreenNavigationProp;
};
 
const LandAddPlantScreen: React.FC<LandAddPlantScreenProps> = ({ route, navigation }) => { 
  
  const landCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000'; 
    
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader />  
      <FormConnectedLandAddPlant landCode={landCode} name='land-add-plant'/>
    </View>
  );
};


export default LandAddPlantScreen;