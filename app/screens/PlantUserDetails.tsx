import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenHeader from '../components/header/ScreenHeader';
import { ScreenBackButton } from '../components/ScreenBackButton';
import { useNavigation } from '@react-navigation/native';
import * as theme from '../constants/theme'
import { ReportConnectedPlantUserDetails } from '../components/reports/connected';

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
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScreenHeader />
          <ReportConnectedPlantUserDetails plantCode={plantCode}/>
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

export default PlantUserDetailsScreen;

