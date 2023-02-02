import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screen/SplashScreen';
import MainScreen from './screen/Main/Main';
import Auth from './screen/Auth/Auth';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Auth' component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
