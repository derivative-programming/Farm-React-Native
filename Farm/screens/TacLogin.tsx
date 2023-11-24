import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { FormConnectedTacLogin } from '../components/forms/connected';
import * as theme from '../constants/theme'

type TacLoginScreenRouteProp = RouteProp<RootStackParamList, 'TacLogin'>;
type TacLoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacLogin'>;

type TacLoginScreenProps = {
  route: TacLoginScreenRouteProp;
  navigation: TacLoginScreenNavigationProp;
};

const TacLoginScreen: React.FC<TacLoginScreenProps> = ({ route, navigation }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  return (
    <View  style={styles.container}>
      <ScreenHeader />
      <FormConnectedTacLogin tacCode={tacCode} name='tac-login'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
  },
});

export default TacLoginScreen;
