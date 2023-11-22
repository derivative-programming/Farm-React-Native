import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
type TacFarmDashboardScreenRouteProp = RouteProp<RootStackParamList, 'TacFarmDashboard'>;
type TacFarmDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacFarmDashboard'>;
type TacFarmDashboardScreenProps = {
  route: TacFarmDashboardScreenRouteProp;
  navigation: TacFarmDashboardScreenNavigationProp;
};
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const TacFarmDashboardScreen: React.FC<TacFarmDashboardScreenProps> = ({ route }) => {
  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <VStack flex={1}>
      <ScreenHeader/>
      <Text>TacFarmDashboardScreen</Text>
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
export default TacFarmDashboardScreen;

