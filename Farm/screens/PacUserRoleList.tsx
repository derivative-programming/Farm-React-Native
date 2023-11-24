import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';

import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
type PacUserRoleListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserRoleList'>;
type PacUserRoleListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserRoleList'>;
type PacUserRoleListScreenProps = {
  route: PacUserRoleListScreenRouteProp;
  navigation: PacUserRoleListScreenNavigationProp;
};
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const PacUserRoleListScreen: React.FC<PacUserRoleListScreenProps> = ({ route }) => {
  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
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
export default PacUserRoleListScreen;

