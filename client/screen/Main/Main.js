import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from './UserScreen';
import { headerStyle } from '../../config/globalStyles';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName='User'>
      <Stack.Screen
        name='User'
        component={UserScreen}
        options={{ ...headerStyle }}
      />
    </Stack.Navigator>
  );
};

export default Main;
