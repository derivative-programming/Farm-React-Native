import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';

import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
import { ReportConnectedPacUserDateGreaterThanFilterList } from '../components/reports/connected';

type PacUserDateGreaterThanFilterListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserDateGreaterThanFilterList'>;
type PacUserDateGreaterThanFilterListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserDateGreaterThanFilterList'>;

type PacUserDateGreaterThanFilterListScreenProps = {
  route: PacUserDateGreaterThanFilterListScreenRouteProp;
  navigation: PacUserDateGreaterThanFilterListScreenNavigationProp;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const PacUserDateGreaterThanFilterListScreen: React.FC<PacUserDateGreaterThanFilterListScreenProps> = ({ route }) => {

  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScreenHeader />
          <ReportConnectedPacUserDateGreaterThanFilterList pacCode={pacCode}/>
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

export default PacUserDateGreaterThanFilterListScreen;

