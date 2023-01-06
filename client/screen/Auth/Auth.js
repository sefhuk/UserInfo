import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { headerStyle } from '../../config/globalStyles';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ title: '로그인', ...headerStyle }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ title: '회원가입', ...headerStyle }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
