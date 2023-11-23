import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader'; 

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
    <View style={{ flex: 1 }}>
      <ScreenHeader/> 
    </View>
  );
};
export default PacUserTriStateFilterListScreen;

