import { Button, View, Text, ViewStyle } from 'react-native';

export const HomeScreen = () => {
  const { logout } = { logout: () => console.log('logout') };

  return (
    <View style={$container}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
