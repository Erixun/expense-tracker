import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ManageExpenseScreen } from '../screens';
import HomeNavigation from './HomeNavigation';
import { Button } from 'react-native';

export type AppStackParams = {
  Home: undefined;
  ManageExpense: { editedExpenseId?: string };
};

const NativeStack = createNativeStackNavigator<AppStackParams>();

export default function AppNavigation() {
  return (
    <NativeStack.Navigator>
      {/* <NativeStack.Screen name="Loading" component={LoadingScreen} />
      <NativeStack.Screen name="Login" component={LoginScreen} /> */}
      <NativeStack.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          headerShown: false,
        }}
      />
      <NativeStack.Screen
        name="ManageExpense"
        component={ManageExpenseScreen}
        options={{
          headerShown: true,
          presentation: 'modal',
        }}
      />
      {/* <NativeStack.Screen
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
      /> */}
    </NativeStack.Navigator>
  );
}
