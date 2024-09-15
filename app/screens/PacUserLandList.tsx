import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';

import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
import { ReportConnectedPacUserLandList } from '../components/reports/connected';

type PacUserLandListScreenRouteProp = RouteProp<RootStackParamList, 'PacUserLandList'>;
type PacUserLandListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PacUserLandList'>;

type PacUserLandListScreenProps = {
  route: PacUserLandListScreenRouteProp;
  navigation: PacUserLandListScreenNavigationProp;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const PacUserLandListScreen: React.FC<PacUserLandListScreenProps> = ({ route }) => {

  const pacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScreenHeader />
          <ReportConnectedPacUserLandList pacCode={pacCode}/>
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

export default PacUserLandListScreen;

