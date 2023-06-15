import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tabs.Navigator>
      {/* <Tabs.Screen name="Recent" component={RecentExpensesScreen} />
      <Tabs.Screen name="All" component={AllExpensesScreen} /> */}
      
    </Tabs.Navigator>
  );
};
