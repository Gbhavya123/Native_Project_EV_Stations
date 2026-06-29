import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View className="flex-row items-center justify-between px-5 py-3 bg-white">
      <Text className="text-3xl font-bold">
        FLU
        <Text className="text-3xl font-bold italic">X</Text>
        <Text className="text-3xl font-bold">TON</Text>
      </Text>

      <View className="flex-row gap-3">
        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <Ionicons name="search-outline" size={22} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <Ionicons name="notifications-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );
}