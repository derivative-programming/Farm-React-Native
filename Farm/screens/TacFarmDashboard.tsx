import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';

import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
import { ReportConnectedTacFarmDashboard } from '../components/reports/connected';

type TacFarmDashboardScreenRouteProp = RouteProp<RootStackParamList, 'TacFarmDashboard'>;
type TacFarmDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacFarmDashboard'>;

type TacFarmDashboardScreenProps = {
  route: TacFarmDashboardScreenRouteProp;
  navigation: TacFarmDashboardScreenNavigationProp;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const TacFarmDashboardScreen: React.FC<TacFarmDashboardScreenProps> = ({ route }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScreenHeader />
          <ReportConnectedTacFarmDashboard tacCode={tacCode}/>
        </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
  },
  safeArea: {

  },
});

export default TacFarmDashboardScreen;

