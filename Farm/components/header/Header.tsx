import React, { FC, ReactElement, useContext } from "react";
import { Dropdown, Nav, NavItem, View } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/authContext"; 
import useAnalyticsDB from "../../hooks/useAnalyticsDB"; 
import * as AnalyticsService from "../services/analyticsService";
import { StackNavigationProp } from "@react-navigation/stack"; 
import RootStackParamList from "../../screens/rootStackParamList";
import * as RouteNames from '../../constants/routeNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Header: FC = (): ReactElement => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<ScreenNavigationProp>();
  
  const { logClick } = useAnalyticsDB();

  const onLogout = () => {
    logClick("Header","logOut","");
    AnalyticsService.stop();
    authContext.setToken("");
    authContext.setRoles("");
    AsyncStorage.setItem("@token", "");
    AsyncStorage.setItem("customerCode","");
    AsyncStorage.setItem("email", "");
  };

  const onLogin = () => {
    logClick("Header","login",""); 
    navigation.navigate(RouteNames.TAC_LOGIN, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onDashboard = () => {
    logClick("Header","dashboard","");
    navigation.navigate("/");
  };
  const onProfile = () => {
    logClick("Header","profile",""); 
    navigation.navigate("CustomerUserUpdateProfile", { code: "00000000-0000-0000-0000-000000000000" });
  };
  const onAdminDashboard = () => {
    logClick("Header","admin","");
    navigation.navigate("/customer-admin-dashboard/00000000-0000-0000-0000-000000000000");
  };
  const onConfigDashboard = () => {
    logClick("Header","config","");
    navigation.navigate("/pac-config-dashboard/00000000-0000-0000-0000-000000000000");
  };

  const onRegister = () => {
    logClick("Header","register",""); 
    navigation.navigate(RouteNames.TAC_REGISTER, { code: "00000000-0000-0000-0000-000000000000" });
  };
  const [isHovered, setIsHovered] = React.useState(false);

 
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <View>
      <View className="header-container h-85 d-flex align-items-center justify-content-between px-40">
        <View className=" pt-2 pr-5 logo-design" ><h4>NewCo Inc.</h4></View>
        <View>
          <View className="d-none d-md-flex ">
          <Nav className="menu-options-container justify-content-end">
            {authContext && authContext.token ? (  
              <>
              <NavItem
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  testID="header-config-dashboard-link"
                  className={`nav-link${isHovered ? ' text-underline' : ''}`}
                  onPress={onConfigDashboard}
                >
                  {authContext && authContext.token && authContext.roles.includes('Config') === true ? "Config" : null}
                </span>
              </NavItem>
                <NavItem
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    testID="header-admin-dashboard-link"
                    className={`nav-link${isHovered ? ' text-underline' : ''}`}
                    onPress={onAdminDashboard}
                  >
                    {authContext && authContext.token && authContext.roles.includes('Admin') === true ? "Admin" : null}
                  </span>
                </NavItem>
                <NavItem
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    testID="header-dashboard-link"
                    className={`nav-link${isHovered ? ' text-underline' : ''}`}
                    onPress={onDashboard}
                  >
                    {authContext && authContext.token && authContext.roles.includes('User') === true ? "Dashboard" : null}
                  </span>
                </NavItem>
                
                <NavItem
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    testID="header-profile-link"
                    className={`nav-link${isHovered ? ' text-underline' : ''}`}
                    onPress={onProfile}
                  >
                    {authContext && authContext.token && authContext.roles.includes('User') === true ? "Profile" : null}
                  </span>
                </NavItem>

                
                <NavItem
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    testID='header-logout-link'
                    className={`nav-link${isHovered ? ' text-underline' : ''}`}
                    onPress={onLogout}
                  >
                    {authContext && authContext.token ? "Log Out" : null}
                  </span>
                </NavItem>
              </>
              ) : ( 
              <>
                <NavItem
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    testID='header-login-link'
                    className={`nav-link${isHovered ? ' text-underline' : ''}`}
                    onPress={onLogin}
                  >
                    {authContext && authContext.token ? null : "Log In"}
                  </span>
                </NavItem>
                
                <NavItem
                  testID='header-register-link'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    className={`nav-link${isHovered ? ' text-underline' : ''}`}
                    onPress={onRegister}
                  >
                    {authContext && authContext.token ? null : "Register"}
                  </span>
                </NavItem>
              </>
              )} 
        </Nav>
            
          </View>
          <View className="mobile-menu">
            <Dropdown>
              <Dropdown.Toggle  id="dropdown-basic"  testID="header-dropdown-menu">
                <hr></hr>
                <hr></hr>
                <hr></hr>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {authContext && authContext.token ? (
                  <>
                
                    <Dropdown.Item 
                      testID="header-dashboard-link"
                      onPress={onDashboard}>
                  
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item 
                      testID="header-profile-link"
                      onPress={onProfile}>
                  
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item 
                      testID="header-dashboard-link"
                      onPress={onAdminDashboard}>
                  
                      
                      {authContext && authContext.token && authContext.roles.includes('Admin') === true ? "Admin" : null}
                    </Dropdown.Item>
                    <Dropdown.Item 
                      testID="header-dashboard-link"
                      onPress={onConfigDashboard}>
                  
                      
                      {authContext && authContext.token && authContext.roles.includes('Config') === true ? "Config" : null}
                    </Dropdown.Item>
                    <Dropdown.Item
                      testID="header-logout-link"
                      onPress={onLogout}> Logout</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item
                      testID="header-login-link" 
                      onPress={onLogin}> Login</Dropdown.Item>
                    <Dropdown.Item
                      testID="header-register-link" 
                      onPress={onRegister}> Register</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </View>
        </View>
      </View>
      <hr/>
    </View>

  );
};
export default Header;
