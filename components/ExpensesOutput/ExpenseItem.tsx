import { View, Text } from "react-native";

interface ExpenseItemProps {
  title: string;
}

const ExpenseItem = ({ title }: ExpenseItemProps) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default ExpenseItem;
