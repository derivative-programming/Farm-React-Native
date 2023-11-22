import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PacUserTacListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserTacList'>;
type PacUserTacListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserTacList'>;

type PacUserTacListScreenProps = {
  route: PacUserTacListScreenRouteProp;
  navigation: PacUserTacListScreenNavigationProp;
};

const PacUserTacListScreen: React.FC<PacUserTacListScreenProps> = ({ route }) => {

  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  return (
    <View style={styles.container}>
    <Text>PacUserTacListScreen</Text>
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

export default PacUserTacListScreen;
