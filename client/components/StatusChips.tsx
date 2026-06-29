import { useMemo } from "react";
import { Text, View } from "react-native";
import { station } from "../types/index";

interface Props {
  stations: station[];
}

const STATUS_COLORS = {
  available: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-600" },
  charging: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-600" },
  offline: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
};

export default function StatusChips({ stations }: Props) {
  const stats = useMemo(() => {
    const counts = { 
      available: 0,
      charging: 0,
      offline: 0,
    };

    stations.forEach(station =>
      station.chargers.forEach(charger => {
        if (counts.hasOwnProperty(charger.status)) {
          counts[charger.status as keyof typeof counts]++;
        }
      })
    );

    return [
      { label: `${counts.available} available`, status: "available" as const },
      { label: `${counts.charging} charging`, status: "charging" as const },
      { label: `${counts.offline} offline`, status: "offline" as const },
    ];
  }, [stations]);

  return (
    <View className="flex-row gap-2 mt-5 px-5">
      {stats.map((item) => {
        const colors = STATUS_COLORS[item.status];
        return (
            <View
            key={item.status}
            className={`flex-row items-center rounded-full px-3 py-2 ${colors.bg}`}
          >
            <View className={`h-2 w-2 rounded-full ${colors.dot}`} />
            <Text className={`ml-2 text-sm font-semibold ${colors.text}`}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}