import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';

const NativeStack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NativeStack.Navigator>
      {/* <NativeStack.Screen name="Loading" component={LoadingScreen} />
      <NativeStack.Screen name="Login" component={LoginScreen} /> */}
      <NativeStack.Screen name="Home" component={HomeScreen} />
      <NativeStack.Screen
        name="Add"
        component={AddExpenseScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <NativeStack.Screen
        name="Edit"
        component={EditExpenseScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </NativeStack.Navigator>
  );
}
