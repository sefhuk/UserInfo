import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from './UserScreen';
import UserLocation from './UserLocation';
import { headerStyle } from '../../config/globalStyles';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName='User'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='User'
        component={UserScreen}
        options={{ title: 'USER INFO', ...headerStyle }}
      />
      <Stack.Screen
        name='Location'
        component={UserLocation}
        options={{
          title: 'MY LOCATION',
          ...headerStyle,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
