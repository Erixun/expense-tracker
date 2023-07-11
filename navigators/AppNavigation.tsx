import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ManageExpenseScreen } from '../screens';
import HomeNavigation from './HomeNavigation';

export type AppStackParams = {
  Home: undefined;
  ManageExpense: { editedExpenseId: string | undefined };
};

const NativeStack = createNativeStackNavigator<AppStackParams>();

export default function AppNavigation() {
  return (
    <NativeStack.Navigator>
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
    </NativeStack.Navigator>
  );
}
