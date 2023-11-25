import React, { FC, ReactElement, useContext } from "react";    
import { View, Text, Pressable, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';  
import Icon from 'react-native-vector-icons/MaterialIcons';  
import {Colors} from '../../constants/theme'
import * as theme from '../../constants/theme'
import { AuthContext } from "../../context/authContext"; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"; 
import RootStackParamList from "../../screens/rootStackParamList";
import * as RouteNames from '../../constants/routeNames';
import useAnalyticsDB from "../../hooks/useAnalyticsDB"; 
import * as AnalyticsService from "../services/analyticsService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ScreenHeaderProps { 
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ScreenHeader: FC<ScreenHeaderProps> = ({ 
}): ReactElement => { 
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<ScreenNavigationProp>();

  if(authContext && authContext.token)
    console.log('App bar auth menu');
  else
      console.log('App bar not auth menu');
  
  const title = "DemoApp"

  const { logClick } = useAnalyticsDB();

  const onLogout = async () => {
    await logClick("Header","logOut","");
    await AnalyticsService.stop();
    authContext.setToken("");
    authContext.setRoles("");
    await AsyncStorage.setItem("@token", "");
    await AsyncStorage.setItem("customerCode","");
    await AsyncStorage.setItem("email", "");
  };

  const onLogin = async () => {
    await logClick("Header","login",""); 
    navigation.navigate(RouteNames.TAC_LOGIN, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onDashboard = async () => {
    await logClick("Header","dashboard","");
    navigation.navigate(RouteNames.TAC_FARM_DASHBOARD, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onProfile = async () => {
    await logClick("Header","profile",""); 
    navigation.navigate("CustomerUserUpdateProfile" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
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
  
  return (   
    // <Box backgroundColor="primary.500"> 
    //   <HStack bg="primary.500" px="1" py="3" alignItems="center" justifyContent="space-between">
    //     <Menu
    //       trigger={(triggerProps) => {
    //         return (
    //           <Pressable accessibilityLabel="More options menu" {...triggerProps}>
    //             <Icon name="menu" size={25} color="white" />
    //           </Pressable>
    //         );
    //       }}>
    //       <Menu.Item onPress={() => navigateTo()}>Login</Menu.Item>
    //       <Menu.Item onPress={() => navigateTo()}>Register</Menu.Item>
    //       <Menu.Item onPress={() => navigateTo()}>Logout</Menu.Item>
    //     </Menu>
    //     <Text color="white" fontSize="20" fontWeight="bold">
    //       {title}
    //     </Text>
    //     <View style={{ width: 25 }} />  
    //   </HStack>
    // </Box> 
    
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.horizontalStack}>
        
        <Menu>
          <MenuTrigger> 
              <Icon name="menu" size={25} color="white" style={styles.menuTrigger} />  
          </MenuTrigger>
          <MenuOptions customStyles={styles.menuOptions}> 
            {authContext && authContext.token ? (  
              //autenticated
              <>
                {authContext && authContext.token && authContext.roles.includes('User') === true && (
                  //all users
                  <>
                    <MenuOption value={1} onSelect={async () => await onDashboard()} text="Dashboard" /> 
                    <MenuOption value={2} onSelect={async () => await onProfile()} text="Profile" /> 
                  </>
                )}
                
                {authContext && authContext.token && authContext.roles.includes('Admin') === true && (
                  //admin users
                  <>
                    <MenuOption value={3} onSelect={async () => await onAdminDashboard()} text="Admin" /> 
                  </>
                )}
                
                {authContext && authContext.token && authContext.roles.includes('Config') === true && (
                  //config users
                  <>
                    <MenuOption value={4} onSelect={async () => await onConfigDashboard()} text="Config" /> 
                  </>
                )}
                <MenuOption value={5} onSelect={async () => await onLogout()} text="Logout" 
               customStyles={optionStyles} /> 
              </>
            ) 
            :
            (
              //not autenticated
              <>
                <MenuOption value={6} onSelect={async () => await onLogin()} text="Login" 
               customStyles={optionStyles} /> 
                <MenuOption value={7} onSelect={async () => await onRegister()} text="Register"  
               customStyles={optionStyles} /> 
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

const optionStyles = {
  optionWrapper: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    color: 'blue',
  },
  // Add more styles as needed
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
    
  },
  container: {
    backgroundColor: Colors.primary, // Replace with your primary color
    // Additional container styling 
    height: 50, 
  },  
  menuOptions: {
    // padding: 10,
    // backgroundColor: 'white',
  },
  horizontalStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4, // px="1" equivalent
    paddingVertical: 12, // py="3" equivalent
    // Additional horizontal stack styling
  },
  menuTrigger: {
    // Styles for the menu trigger
    paddingLeft: 10,
  },
  menuIcon: {
    color: 'white',
    fontSize: theme.fonts.largeSize,
    // Additional icon styling
  },
  titleText: {
    color: 'white',
    fontSize: theme.fonts.mediumSize,
    fontWeight: 'bold',
    // Additional title text styling
  },
  placeholderView: {
    width: 25,
    paddingRight: 10,
    // Additional placeholder view styling if needed
  },
  // Other styles as needed
});

export default ScreenHeader;
