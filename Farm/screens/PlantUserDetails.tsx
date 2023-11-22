import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PlantUserDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlantUserDetails'>;
type PlantUserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PlantUserDetails'>;

type PlantUserDetailsScreenProps = {
  route: PlantUserDetailsScreenRouteProp;
  navigation: PlantUserDetailsScreenNavigationProp;
};

const PlantUserDetailsScreen: React.FC<PlantUserDetailsScreenProps> = ({ route }) => {

  const plantCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  return (
    <View style={styles.container}>
    <Text>PlantUserDetailsScreen</Text>
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

export default PlantUserDetailsScreen;
