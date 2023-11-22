import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
type PacUserTriStateFilterListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserTriStateFilterList'>;
type PacUserTriStateFilterListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserTriStateFilterList'>;
type PacUserTriStateFilterListScreenProps = {
  route: PacUserTriStateFilterListScreenRouteProp;
  navigation: PacUserTriStateFilterListScreenNavigationProp;
};
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const PacUserTriStateFilterListScreen: React.FC<PacUserTriStateFilterListScreenProps> = ({ route }) => {
  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <VStack flex={1}>
      <ScreenHeader/>
      <Text>PacUserTriStateFilterListScreen</Text>
    </VStack>
  );
};
export default PacUserTriStateFilterListScreen;

