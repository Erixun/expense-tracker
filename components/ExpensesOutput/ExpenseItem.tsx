import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Expense from '../../types/Expense';
import { palette } from '../../theme/colors';
import { AppStackParams } from '../../navigators/AppNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFormattedDate } from '../../utils/getFormattedDate';

type NavigationProp = NativeStackNavigationProp<AppStackParams>;

const ExpenseItem = ({ id, description, amount, date }: Expense) => {
  const navigation = useNavigation<NavigationProp>();
  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', {
      editedExpenseId: id,
    });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: palette.background.default,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.shadow.default,
    elevation: 3,
    shadowColor: palette.shadow.default,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: palette.text.primary,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: palette.primary.main,
    fontWeight: 'bold',
  },
});
