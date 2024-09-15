import React from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { FormConnectedTacRegister } from '../components/forms/connected';
import * as theme from '../constants/theme'

type TacRegisterScreenRouteProp = RouteProp<RootStackParamList, 'TacRegister'>;
type TacRegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacRegister'>;

type TacRegisterScreenProps = {
  route: TacRegisterScreenRouteProp;
  navigation: TacRegisterScreenNavigationProp;
};

const TacRegisterScreen: React.FC<TacRegisterScreenProps> = ({ route, navigation }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ScreenHeader />
        <FormConnectedTacRegister tacCode={tacCode} name='tac-register'/>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
  },
});

export default TacRegisterScreen;
