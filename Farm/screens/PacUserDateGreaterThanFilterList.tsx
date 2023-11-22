import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
type PacUserDateGreaterThanFilterListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserDateGreaterThanFilterList'>;
type PacUserDateGreaterThanFilterListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserDateGreaterThanFilterList'>;
type PacUserDateGreaterThanFilterListScreenProps = {
  route: PacUserDateGreaterThanFilterListScreenRouteProp;
  navigation: PacUserDateGreaterThanFilterListScreenNavigationProp;
};
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const PacUserDateGreaterThanFilterListScreen: React.FC<PacUserDateGreaterThanFilterListScreenProps> = ({ route }) => {
  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <VStack flex={1}>
      <ScreenHeader/>
      <Text>PacUserDateGreaterThanFilterListScreen</Text>
    </VStack>
  );
};
export default PacUserDateGreaterThanFilterListScreen;

