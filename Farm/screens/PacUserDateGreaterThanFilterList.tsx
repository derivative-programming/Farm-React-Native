import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PacUserDateGreaterThanFilterListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserDateGreaterThanFilterList'>;
type PacUserDateGreaterThanFilterListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserDateGreaterThanFilterList'>;

type PacUserDateGreaterThanFilterListScreenProps = {
  route: PacUserDateGreaterThanFilterListScreenRouteProp;
  navigation: PacUserDateGreaterThanFilterListScreenNavigationProp;
};

const PacUserDateGreaterThanFilterListScreen: React.FC<PacUserDateGreaterThanFilterListScreenProps> = ({ route }) => {

  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  return (
    <View style={styles.container}>
    <Text>PacUserDateGreaterThanFilterListScreen</Text>
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

export default PacUserDateGreaterThanFilterListScreen;
