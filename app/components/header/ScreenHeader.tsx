import React, { FC, ReactElement, useContext } from "react";    
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';  
import Icon from 'react-native-vector-icons/MaterialIcons';  
import * as theme from '../../constants/theme';
import { AuthContext } from "../../context/authContext"; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"; 
import RootStackParamList from "../../screens/rootStackParamList";
import * as RouteNames from '../../constants/routeNames';
import useAnalyticsDB from "../../hooks/useAnalyticsDB"; 
import * as AnalyticsService from "../services/analyticsService";

export interface ScreenHeaderProps {}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ScreenHeader: FC<ScreenHeaderProps> = (): ReactElement => { 
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<ScreenNavigationProp>();
  const title = "Simple Api";
  const { logClick } = useAnalyticsDB();

  // Extract customer and organization names from authContext
  const { customerName, organizationName } = authContext;

  const onLogout = async () => {
    await logClick("Header","logOut","");
    await AnalyticsService.stop();
    authContext.clearSession(); 
    await onLogin();
  };

  const onLogin = async () => {
    await logClick("Header","login",""); 
    navigation.navigate(RouteNames.TAC_LOGIN, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onForgotPassword = async () => {
    await logClick("Header","forgotPassword",""); 
    navigation.navigate("TacForgotPassword" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onDashboard = async () => {
    await logClick("Header","dashboard","");
    navigation.navigate(RouteNames.TAC_FARM_DASHBOARD, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onProfile = async () => {
    await logClick("Header","profile",""); 
    navigation.navigate("CustomerUserUpdateProfile" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onChangePassword = async () => {
    await logClick("Header","changePassword",""); 
    navigation.navigate("CustomerUserUpdatePassword" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onAdminDashboard = async () => {
    await logClick("Header","admin","");
    navigation.navigate("CustomerAdminDashboard" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onConfigDashboard = async () => {
    await logClick("Header","config","");
    navigation.navigate("PacConfigDashboard" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onRegister = async () => {
    await logClick("Header","register",""); 
    navigation.navigate(RouteNames.TAC_REGISTER, { code: "00000000-0000-0000-0000-000000000000" });
  }; 

  // Custom styles for MenuOptions and MenuOption
  const menuOptionsStyles = {
    optionsContainer: {
      padding: 10,
      backgroundColor: 'white',
      minWidth: 250, // Adjust this value to change the menu width
    },
  };

  const menuOptionStyles = {
    optionWrapper: {
      paddingVertical: 12,
    },
    optionText: {
      fontSize: 18,
      color: 'black',
    },
  };

  return (    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.horizontalStack}>
          <Menu>
            <MenuTrigger> 
              <Icon name="menu" size={25} color="white" style={styles.menuTrigger} />  
            </MenuTrigger>
            <MenuOptions customStyles={menuOptionsStyles}> 
              {authContext && authContext.token ? (  
                <>
                  {/* User Info Section */}
                  <View style={styles.userInfoContainer}>
                    {customerName && (
                      <Text style={styles.userNameText}>{customerName}</Text>
                    )}
                    {organizationName && (
                      <Text style={styles.companyNameText}>{organizationName}</Text>
                    )}
                  </View>
                  <View style={styles.separator} />
                  {/* Menu Options for Authenticated Users */}
                  {authContext.roles.includes('User') && (
                    <>
                      <MenuOption value={1} onSelect={onDashboard} text="Dashboard" customStyles={menuOptionStyles} /> 
                      <MenuOption value={2} onSelect={onProfile} text="Profile" customStyles={menuOptionStyles} /> 
                      <MenuOption value={3} onSelect={onChangePassword} text="Change Password" customStyles={menuOptionStyles} /> 
                    </>
                  )}
                  {authContext.roles.includes('Admin') && (
                    <MenuOption value={4} onSelect={onAdminDashboard} text="Admin" customStyles={menuOptionStyles} /> 
                  )}
                  {authContext.roles.includes('Config') && (
                    <MenuOption value={5} onSelect={onConfigDashboard} text="Config" customStyles={menuOptionStyles} /> 
                  )}
                  <MenuOption value={6} onSelect={onLogout} text="Logout" customStyles={menuOptionStyles} /> 
                </>
              ) : (
                <>
                  <MenuOption value={7} onSelect={onLogin} text="Login" customStyles={menuOptionStyles} /> 
                  <MenuOption value={8} onSelect={onForgotPassword} text="Forgot Password" customStyles={menuOptionStyles} /> 
                  <MenuOption value={9} onSelect={onRegister} text="Register" customStyles={menuOptionStyles} /> 
                </>
              )}
            </MenuOptions>
          </Menu>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.placeholderView} />
        </View> 
      </View> 
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    backgroundColor: theme.Colors.primary, 
    height: 50, 
  },  
  horizontalStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4, 
    paddingVertical: 12,  
  },
  menuTrigger: { 
    paddingLeft: 10,
  },
  titleText: {
    color: 'white',
    fontSize: theme.fonts.mediumSize,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  placeholderView: {
    width: 35,
    paddingRight: 10, 
  },
  // Styles for User Info Section
  userInfoContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0', // Light gray background
    borderRadius: 5,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  companyNameText: {
    fontSize: 14,
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});

export default ScreenHeader;
