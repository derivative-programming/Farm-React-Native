import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';

import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
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
    <View  style={styles.container}>
      <ScreenHeader/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
  },
});
export default TacFarmDashboardScreen;

