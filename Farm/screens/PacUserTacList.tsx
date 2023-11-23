import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader'; 

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
    <View style={{ flex: 1 }}>
      <ScreenHeader/> 
    </View>
  );
};
export default PacUserTacListScreen;

