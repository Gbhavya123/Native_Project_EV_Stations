import { FlatList } from "react-native";
import ChargerCard from "./ChargerCard";
import { charger } from "@/types";
import { useRouter } from 'expo-router';

interface Props {
  stationId: string;
  chargers: charger[];
}

export default function ChargerList({ stationId, chargers }: Props) {
  const router = useRouter();
  return (
    <FlatList
      data={chargers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChargerCard
          stationId={stationId}
          charger={item}
          onPress={id => router.push({
            pathname: "/charger/[id]",
            params: { id },
          })}
        />
      )
      }
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}