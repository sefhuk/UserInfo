import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screen/SplashScreen';
import MainScreen from './screen/Main/Main';
import AuthScreen from './screen/Auth/Auth';
import { headerStyle } from './config/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const getLogin = async () => {
    if ((await AsyncStorage.getItem('user_id')) !== null) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getLogin();
    console.log('good');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Auth'
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

