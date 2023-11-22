import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, VStack } from "native-base";
import ScreenHeader from '../components/header/ScreenHeader';

type TacLoginScreenRouteProp = RouteProp<RootStackParamList, 'TacLogin'>;
type TacLoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacLogin'>;

type TacLoginScreenProps = {
  route: TacLoginScreenRouteProp;
  navigation: TacLoginScreenNavigationProp;
};

const TacLoginScreen: React.FC<TacLoginScreenProps> = ({ route, navigation }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
 
  return (
    <VStack flex={1}> 
        <ScreenHeader /> 
        <Text>TacLoginScreen</Text> 
    </VStack>
  );
};
 
export default TacLoginScreen;
