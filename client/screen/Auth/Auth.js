import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ title: '회원가입' }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
