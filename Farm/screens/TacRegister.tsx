import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { HStack, Text, VStack } from 'native-base';

type TacRegisterScreenRouteProp = RouteProp<RootStackParamList, 'TacRegister'>;
type TacRegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacRegister'>;

type TacRegisterScreenProps = {
  route: TacRegisterScreenRouteProp;
  navigation: TacRegisterScreenNavigationProp;
};

const TacRegisterScreen: React.FC<TacRegisterScreenProps> = ({ route, navigation }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
 
  return (
    <VStack flex={1}>
      <ScreenHeader />
      <Text>TacRegisterScreen</Text>
    </VStack>
  );
};
 
export default TacRegisterScreen;
