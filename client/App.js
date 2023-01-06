import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screen/SplashScreen';
import MainScreen from './screen/Main/Main';
import Auth from './screen/\bAuth/Auth';

const Stack = createNativeStackNavigator();

const App = () => {
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
          component={Auth}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
