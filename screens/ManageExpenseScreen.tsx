import { View, Text, Pressable, ViewStyle, TextStyle } from 'react-native';
import { ExpensesContext, FreshExpense } from '../store/expensesContext';
import { useContext, useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigators/AppNavigation';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import Expense from '../types/Expense';
import { storeExpense } from '../utils/http';

export type ManageExpenseScreenProps = NativeStackScreenProps<
  AppStackParams,
  'ManageExpense'
>;

export type ExpenseNavigation = Omit<ManageExpenseScreenProps, 'route'>;

export const ManageExpenseScreen = ({
  route,
  navigation,
}: ManageExpenseScreenProps) => {
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params.editedExpenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = (data: FreshExpense) => {
    console.log('submit - not implemented');
    console.log('intend to submit: ', data)
    if (isEditing) {
      // expensesContext.editExpense(editedExpenseId!, data);
    } else {
      storeExpense(data)
      // expensesContext.addExpense(data);
    }
    navigation.goBack();
  };

  return (
    <View style={$container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Save'}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        isEditing={isEditing}
        navigation={navigation}
      />
      {/* <View style={$buttonGroup}>
        <Pressable
          android_ripple={{ color: 'grey' }}
          style={[$button]}
          onPress={() => navigation.goBack()}
        >
          <Text style={$btnText}>Cancel</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: 'green' }}
          style={[$button, { backgroundColor: palette.primary.main }]}
          onPress={() => {
            console.log('save - not implemented');
            if (isEditing) {
              // expensesContext.editExpense(editedExpenseId!);
            } else {
              // expensesContext.addExpense();
            }
            navigation.goBack();
          }}
        >
          <Text style={[$btnText, { color: 'white' }]}>Save</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-start',
  padding: 10,
};

// const $buttonGroup: ViewStyle = {
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   // gap: 10,
//   width: '100%',
// };

// const $button: ViewStyle = {
//   width: '40%',
//   padding: 10,
//   borderRadius: 10,
//   borderWidth: 1,
//   borderColor: 'black',
//   alignItems: 'center',
// };

// const $btnText: TextStyle = {
//   fontSize: 16,
//   fontWeight: 'bold',
// };
