import React from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import ScreenHeader from '../components/header/ScreenHeader'; 
import { FormConnectedLandAddPlant } from '../components/forms/connected';
import * as theme from '../constants/theme'
 

type LandAddPlantScreenRouteProp = RouteProp<RootStackParamList, 'LandAddPlant'>;
type LandAddPlantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LandAddPlant'>;

type LandAddPlantScreenProps = {
  route: LandAddPlantScreenRouteProp;
  navigation: LandAddPlantScreenNavigationProp;
};
 
const LandAddPlantScreen: React.FC<LandAddPlantScreenProps> = ({ route, navigation }) => { 
  
  const landCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000'; 
    
  return (
    
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}> 
        <ScreenHeader />
        <FormConnectedLandAddPlant landCode={landCode} name='land-add-plant'/> 
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

export default LandAddPlantScreen;