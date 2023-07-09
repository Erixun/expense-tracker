import { ActivityIndicator, View } from 'react-native';
import { palette } from '../theme/colors';

export const LoadingOverlay = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={palette.primary.dark} />
    </View>
  );
};
