import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootStackParamList from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';  

type TacRegisterScreenRouteProp = RouteProp<RootStackParamList, 'TacRegister'>;
type TacRegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TacRegister'>;

type TacRegisterScreenProps = {
  route: TacRegisterScreenRouteProp;
  navigation: TacRegisterScreenNavigationProp;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const TacRegisterScreen: React.FC<TacRegisterScreenProps> = ({ route, navigation }) => {

  const tacCode = route.params?.code ?? '00000000-0000-0000-0000-000000000000';
 

  return (
    <View style={styles.container}>
    <Text>TacRegisterScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default TacRegisterScreen;
