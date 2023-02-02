import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from './UserScreen';
import UserLocation from './UserLocation';

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
        options={{ title: 'USER INFO' }}
      />
      <Stack.Screen
        name='Location'
        component={UserLocation}
        options={{
          title: 'MY LOCATION',
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
