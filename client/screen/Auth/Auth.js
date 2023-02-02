import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import FindAccountScreen from './FindAccountScreen';
import { headerStyle } from '../../config/globalStyles';

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
      <Stack.Screen
        name='FindAccount'
        component={FindAccountScreen}
        options={{ title: '아이디 분실' }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
