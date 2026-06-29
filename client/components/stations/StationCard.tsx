import { View, Text, Pressable } from 'react-native';
import { station, charger } from '../../types/index';

interface Props {
  station: station;
  onPress: (id: string) => void;
}

const PIP_COLORS: Record<charger['status'], string>|any = {
  available: 'bg-green-500',
  charging:  'bg-amber-400',
  faulted:   'bg-red-500',
  offline:   'bg-neutral-400',
};

const BADGE_COLORS: Record<'free' | 'none', string> = {
  free: 'bg-green-100',
  none: 'bg-red-100',
};

const BADGE_TEXT_COLORS: Record<'free' | 'none', string> = {
  free: 'text-green-700',
  none: 'text-red-700',
};

export default function StationCard({ station, onPress }: Props) {
  const freeCount = station.chargers.filter(c => c.status === 'available').length;
  const maxPower   = Math.max(...station.chargers.map(c => c.powerKw));
  const badgeKey   = freeCount > 0 ? 'free' : 'none';

  return (
    <Pressable
      onPress={() => onPress(station.id)}
      className="bg-white border border-neutral-200 rounded-2xl px-4 py-3 mb-3"
    >
      {/* Top row */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-base font-medium text-neutral-900">{station.name}</Text>
          <Text className="text-xs text-neutral-400 mt-0.5">{station.location}</Text>
        </View>

        {/* Available badge */}
        <View className={`px-2.5 py-1 rounded-full ${BADGE_COLORS[badgeKey]}`}>
          <Text className={`text-xs font-medium ${BADGE_TEXT_COLORS[badgeKey]}`}>
            {freeCount > 0 ? `${freeCount} free` : '0 free'}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-neutral-100 mb-3" />

      {/* Meta row */}
      <View className="flex-row justify-between items-center">
        <View className="items-center">
          <Text className="text-xs text-neutral-400">Chargers</Text>
          <Text className="text-sm font-medium text-neutral-600 mt-0.5">
            {station.chargers.length} total
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-xs text-neutral-400">Max power</Text>
          <Text className="text-sm font-medium text-neutral-600 mt-0.5">{maxPower} kW</Text>
        </View>

        {/* Status pips */}
        <View className="items-center">
          <Text className="text-xs text-neutral-400">Status</Text>
          <View className="flex-row gap-1 mt-1">
            {station.chargers.map(c => (
              <View
                key={c.id}
                className={`w-2.5 h-2.5 rounded-sm ${PIP_COLORS[c.status]}`}
              />
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
}