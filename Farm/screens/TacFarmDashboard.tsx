import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type TacFarmDashboardScreenRouteProp = RouteProp<RootStackParamList, 'TacFarmDashboard'>;
type TacFarmDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacFarmDashboard'>;

type TacFarmDashboardScreenProps = {
  route: TacFarmDashboardScreenRouteProp;
  navigation: TacFarmDashboardScreenNavigationProp;
};

const TacFarmDashboardScreen: React.FC<TacFarmDashboardScreenProps> = ({ route }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  return (
    <View style={styles.container}>
    <Text>TacFarmDashboardScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default TacFarmDashboardScreen;
