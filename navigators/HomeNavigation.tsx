import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AllExpenses, RecentExpenses } from '../screens';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from './AppNavigation';
import { FC } from 'react';
import { palette } from '../theme/colors';

const Tabs = createBottomTabNavigator();

type HomeNavigationProps = NativeStackScreenProps<AppStackParams, 'Home'>;

const HomeNavigation: FC<HomeNavigationProps> = ({ navigation }) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarStyle: {
          backgroundColor: palette.primary.main,
        },
        tabBarInactiveTintColor: 'white',
        headerRight: () => (
          <Button
            title="Add"
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
      }}
    >
      <Tabs.Screen name="Recent Expenses" component={RecentExpenses} />
      <Tabs.Screen name="All Expenses" component={AllExpenses} />
    </Tabs.Navigator>
  );
};

export default HomeNavigation;
