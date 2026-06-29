import ChargerList from "@/components/chargers/ChargerList";
import { useStationStore } from "@/store/stationStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StationDetailsHeader() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams();
    const stationId = typeof id === 'string' ? id : id?.[0];

    const station = useStationStore((s) =>
        s.stations.find((st) => st.id === stationId)
    );
    return (
        <>
            <View className="bg-white px-5 pt-4 pb-5" style={{ paddingTop: insets.top }}>
                <Pressable onPress={() => router.back()} className=" mt-4 mb-4 flex-row items-center">
                    <Ionicons name="arrow-back" size={20} color="#2563EB" />
                    <Text className="ml-2 text-base font-bold text-blue-600 ">Stations</Text>
                </Pressable>
                <Text className="text-3xl font-bold text-gray-900">
                    {station?.name}
                </Text>
                <View className="mt-2 flex-row items-center">
                    <Ionicons name="location-outline" size={16} color="#9CA3AF" />
                    <Text className="ml-1 text-base text-gray-500">
                        {station?.location} · {station?.chargers.length} chargers
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center justify-between border-y border-gray-200 bg-white px-5 py-3">
                <View className="flex-row items-center">
                    <View className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <Text className="ml-2 font-semibold text-green-700">
                        Live updates on
                    </Text>
                </View>
                <Text className="text-sm text-gray-500">
                    Updated just now
                </Text>
            </View>
            <View className="flex-1">
                <ChargerList
                    stationId={stationId || ''}
                    chargers={station?.chargers || []}
                />
            </View>
        </>

    );
}