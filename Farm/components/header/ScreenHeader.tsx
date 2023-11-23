import React, { FC, ReactElement, useContext } from "react";    
import { View, Text, Pressable, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';  
import Icon from 'react-native-vector-icons/MaterialIcons';  
import {bootstrapColors} from '../../constants/theme'
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
    logClick("Header","logOut","");
    AnalyticsService.stop();
    authContext.setToken("");
    authContext.setRoles("");
    await AsyncStorage.setItem("@token", "");
    await AsyncStorage.setItem("customerCode","");
    await AsyncStorage.setItem("email", "");
  };

  const onLogin = () => {
    logClick("Header","login",""); 
    navigation.navigate(RouteNames.TAC_LOGIN, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onDashboard = () => {
    logClick("Header","dashboard","");
    navigation.navigate(RouteNames.TAC_FARM_DASHBOARD, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onProfile = () => {
    logClick("Header","profile",""); 
    navigation.navigate("CustomerUserUpdateProfile" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onAdminDashboard = () => {
    logClick("Header","admin","");
    navigation.navigate("CustomerAdminDashboard" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onConfigDashboard = () => {
    logClick("Header","config","");
    navigation.navigate("PacConfigDashboard" as keyof RootStackParamList, { code: "00000000-0000-0000-0000-000000000000" });
  };

  const onRegister = () => {
    logClick("Header","register",""); 
    navigation.navigate(RouteNames.TAC_REGISTER, { code: "00000000-0000-0000-0000-000000000000" });
  }; 

  
  const handleMenuTriggerPress = () => {
    console.log('Menu Trigger Pressed');
    // Any other logic you want to execute when the MenuTrigger is pressed
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
            <Pressable style={styles.menuTrigger}  onPress={handleMenuTriggerPress}>
              <Icon name="menu" size={25} color="white" /> 
            </Pressable>
          </MenuTrigger>
          <MenuOptions customStyles={styles.menuOptions}>
            {authContext && authContext.token ? (  
              //autenticated
              <>
                {authContext && authContext.token && authContext.roles.includes('User') === true && (
                  //all users
                  <>
                    <MenuOption onSelect={() => onDashboard()} text="Dashboard" /> 
                    <MenuOption onSelect={() => onProfile()} text="Profile" /> 
                  </>
                )}
                
                {authContext && authContext.token && authContext.roles.includes('Admin') === true && (
                  //admin users
                  <>
                    <MenuOption onSelect={() => onAdminDashboard()} text="Admin" /> 
                  </>
                )}
                
                {authContext && authContext.token && authContext.roles.includes('Config') === true && (
                  //config users
                  <>
                    <MenuOption onSelect={() => onConfigDashboard()} text="Config" /> 
                  </>
                )}
                <MenuOption onSelect={() => onLogout()} text="Logout" 
               customStyles={optionStyles} /> 
              </>
            ) 
            :
            (
              //not autenticated
              <>
                <MenuOption onSelect={() => onLogin()} text="Login" 
               customStyles={optionStyles} /> 
                <MenuOption onSelect={() => onRegister()} text="Register"  
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
    backgroundColor: bootstrapColors.primary, // Replace with your primary color
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
    // Additional placeholder view styling if needed
  },
  // Other styles as needed
});

export default ScreenHeader;
