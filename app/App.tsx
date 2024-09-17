import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { StyleSheet } from 'react-native'; 
import { MenuProvider } from 'react-native-popup-menu';
import AuthProvider, { AuthContext } from "./context/authContext";
import AuthenticatedRoute from "./routes/authenticatedRoute";
import PublicRoute from "./routes/publicRoutes";
import SplashScreen from './components/SplashScreen';  // Your custom splash screen component
 

const App: React.FC = (): React.ReactElement => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const authValue = useContext(AuthContext);
 
  const handleSplashFinish = () => {
    setSplashVisible(false);  
  };
  
  return (  
    <>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <MenuProvider
          customStyles={{ menuProviderWrapper: styles.menuProviderWrapper }}
          backHandler={false} >
          <NavigationContainer>
            {authValue && authValue.token ? <AuthenticatedRoute /> : <PublicRoute />} 
          </NavigationContainer> 
        </MenuProvider> 
      )}
    </>
    

  );
}; 
 
export default () => (
  <AuthProvider children={undefined}>
    <App />
  </AuthProvider>
);

const styles = StyleSheet.create({
  menuProviderWrapper: { 
  },
});
 