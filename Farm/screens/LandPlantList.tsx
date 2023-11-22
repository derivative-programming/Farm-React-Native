import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';
import { ScreenBackButton } from '../components/ScreenBackButton';
import { useNavigation } from '@react-navigation/native';
 
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
    <VStack flex={1}> 
      <ScreenHeader/>  
      <Text>LandPlantListScreen</Text>
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
 
export default LandPlantListScreen;