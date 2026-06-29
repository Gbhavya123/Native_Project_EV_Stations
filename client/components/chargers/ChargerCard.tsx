import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { charger } from "@/types";
import { STATUS } from "@/data/ChargerStatus";
import { socket } from "@/hooks/useSocket";

interface Props {
  stationId: string;
  charger: charger;
  onPress: (id: string) => void;
}

export default function ChargerCard({ stationId, charger, onPress }: Props) {
  const handleFree = () => {
    socket.emit('charger:free', { stationId, chargerId: charger.id });
  };

  const handleBookSlot = () => {
    socket.emit('charger:book', { stationId, chargerId: charger.id });
  };

  const handleNotifyWhenFree = () => {
    socket.emit('charger:notifyWhenFree', { stationId, chargerId: charger.id });
  };
  const status = STATUS[charger.status];

  return (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white p-4">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xl font-bold">{charger.label}</Text>
          <Text className="mt-1 text-gray-500">
            DC Fast · {charger.powerKw} kW
          </Text>
        </View>

        <View className={`flex-row items-center rounded-full px-3 py-1 ${status.bg}`}>
          <View className={`mr-2 h-2 w-2 rounded-full ${status.dot}`} />
          <Text className={`font-semibold ${status.text}`}>{status.label}</Text>
        </View>
      </View>

      <View className="my-4 h-px bg-gray-200" />

      <View className="flex-row justify-between">
        <View>
          <Text className="text-xs text-gray-500">Connector</Text>
          <Text className="font-semibold">
            {charger.powerKw > 22 ? "CCS2" : "Type 2"}
          </Text>
        </View>

        <View>
          <Text className="text-xs text-gray-500">Power</Text>
          <Text className="font-semibold">{charger.powerKw} kW</Text>
        </View>

        <View>
          <Text className="text-xs text-gray-500">Est. wait</Text>
          <Text className="font-semibold">
            {charger.status === "charging" ? "18 min" : charger.status === "available" ? "0 min" : "--"}
          </Text>
        </View>

        <View>
          <Text className="text-xs text-gray-500">Rate</Text>
          <Text className="font-semibold">₹18/kWh</Text>
        </View>
      </View>

      {charger.status === "available" && (
        <TouchableOpacity onPress={handleBookSlot}>
          <Text className="mt-4 self-end font-medium text-gray-500">Book slot →</Text>
        </TouchableOpacity>
      )}

      {charger.status === "charging" && (
        <>
          <View className="mt-4">
            <View className="mb-1 flex-row justify-between">
              <Text className="text-xs text-gray-500">Session progress</Text>
              <Text className="text-xs text-gray-500">62%</Text>
            </View>
            <View className="h-1 rounded-full bg-gray-200">
              <View className="h-1 w-[62%] rounded-full bg-amber-600" />
            </View>
          </View>

          <View className="mt-3 flex-row items-center justify-between">

            <TouchableOpacity className="flex-row items-center" onPress={handleFree}>
              <Ionicons name="flash" size={18} color="#6B7280" />
              <Text className="ml-1 text-gray-500">Free</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center" onPress={handleNotifyWhenFree}>
              <Ionicons name="notifications-outline" size={18} color="#6B7280" />
              <Text className="ml-1 text-gray-500">Notify when free</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {charger.status === "faulted" && (
        <View className="mt-4 flex-row rounded-xl bg-red-100 p-3">
          <Ionicons name="warning-outline" size={18} color="#B91C1C" />
          <Text className="ml-2 flex-1 text-red-700">
            Charger reported a fault. Technician notified.
          </Text>
        </View>
      )}
    </View>
  );
}