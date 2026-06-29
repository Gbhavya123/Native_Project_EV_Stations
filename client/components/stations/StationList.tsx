import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { station } from '../../types/index';
import StationCard from './StationCard';

interface Props {
    stations: station[];
}

export default function StationList({ stations }: Props) {
    const router = useRouter();

    return (
        <FlatList  
            data={stations}
            keyExtractor={item => item.id}
            contentContainerClassName="px-4 pt-2 pb-8"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <StationCard
                    station={item}
                    onPress={id => router.push(`/station/${id}`)}
                />
            )}
        />
    );
}