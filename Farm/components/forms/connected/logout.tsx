import React, {
  FC,
  ReactElement,
  useContext, 
} from "react"; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../../context/authContext"; 
import * as AnalyticsService from "../../services/analyticsService";
import { View } from "native-base";
import * as RouteNames from '../../../constants/routeNames';
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";

export interface FormProps {
  name?: string; 
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const Logout: FC<FormProps> = ({
  name = "logout", 
}): ReactElement => { 

  const navigation = useNavigation<ScreenNavigationProp>();

  const authContext = useContext(AuthContext); 
  
  // AnalyticsService.stop();
  // authContext.setToken("");
  // authContext.setRoles("");
  // AsyncStorage.setItem("@token", "");
  // AsyncStorage.setItem("customerCode","");
  // AsyncStorage.setItem("email", "");

  // navigate("/tac-login");
  
  const handleLogout = async () => {
    AnalyticsService.stop();
    authContext.setToken("");
    authContext.setRoles("");

    await AsyncStorage.setItem("@token","");
    await AsyncStorage.setItem("customerCode","");
    await AsyncStorage.setItem("email","");

    // Replace with the name of your login route
    navigation.navigate('TacLogin', { code: '00000000-0000-0000-0000-000000000000' });
  };

  
  React.useEffect(() => {
    handleLogout();
  }, []);
 
  return (
    <View>
       
    </View>
  );
};

export default Logout;
