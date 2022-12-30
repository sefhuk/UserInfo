import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import User from './screen/User';
import { headerStyle } from './config/globalStyles';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'WELCOME', ...headerStyle }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            title: '로그인',
            ...headerStyle,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ title: '회원가입', ...headerStyle }}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={{ ...headerStyle }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
