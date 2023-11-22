import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';
 

type LandAddPlantScreenRouteProp = RouteProp<RootStackParamList, 'LandAddPlant'>;
type LandAddPlantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LandAddPlant'>;

type LandAddPlantScreenProps = {
  route: LandAddPlantScreenRouteProp;
  navigation: LandAddPlantScreenNavigationProp;
};
 
const LandAddPlantScreen: React.FC<LandAddPlantScreenProps> = ({ route, navigation }) => { 
  
  const landCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000'; 
  
  const titleText = "Add Plant"
  const introText = "Add plant intro text."

  return (
    <VStack flex={1}> 
      <ScreenHeader /> 
      <Text>LandAddPlantScreen</Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }, 
});

export default LandAddPlantScreen;