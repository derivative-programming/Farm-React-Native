import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
type PacUserTacListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserTacList'>;
type PacUserTacListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserTacList'>;
type PacUserTacListScreenProps = {
  route: PacUserTacListScreenRouteProp;
  navigation: PacUserTacListScreenNavigationProp;
};
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const PacUserTacListScreen: React.FC<PacUserTacListScreenProps> = ({ route }) => {
  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <VStack flex={1}>
      <ScreenHeader/>
      <Text>PacUserTacListScreen</Text>
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
export default PacUserTacListScreen;

