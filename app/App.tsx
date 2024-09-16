import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { StyleSheet } from 'react-native'; 
import { MenuProvider } from 'react-native-popup-menu';
import AuthProvider, { AuthContext } from "./context/authContext";
import AuthenticatedRoute from "./routes/authenticatedRoute";
import PublicRoute from "./routes/publicRoutes";
 

const App: React.FC = (): React.ReactElement => {
  const authValue = useContext(AuthContext);
 
  return (  
    <MenuProvider
      customStyles={{ menuProviderWrapper: styles.menuProviderWrapper }}
      backHandler={false} >
      <NavigationContainer>
        {authValue && authValue.token ? <AuthenticatedRoute /> : <PublicRoute />} 
      </NavigationContainer> 
    </MenuProvider> 

  );
}; 
 
export default () => (
  <AuthProvider children={undefined}>
    <App />
  </AuthProvider>
);

const styles = StyleSheet.create({
  menuProviderWrapper: {
    // Custom styles here
  },
});
 