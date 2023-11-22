import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';
import { ScreenBackButton } from '../components/ScreenBackButton';
import { useNavigation } from '@react-navigation/native';
type PlantUserDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlantUserDetails'>;
type PlantUserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PlantUserDetails'>;
type PlantUserDetailsScreenProps = {
  route: PlantUserDetailsScreenRouteProp;
  navigation: PlantUserDetailsScreenNavigationProp;
};
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const PlantUserDetailsScreen: React.FC<PlantUserDetailsScreenProps> = ({ route }) => {
  const plantCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <VStack flex={1}>
      <ScreenHeader/>
      <Text>PlantUserDetailsScreen</Text>
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
export default PlantUserDetailsScreen;

