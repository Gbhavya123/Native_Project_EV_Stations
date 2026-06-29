import CityDropdown from '@/components/CityDropdown';
import Header from '@/components/Header';
import StatusChips from '@/components/StatusChips';
import StationList from '@/components/stations/StationList';
import { useStationStore } from '@/store/stationStore';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import "../../global.css";

const CITIES = ["Bangalore, KA", "Delhi, DL", "Mumbai, MH"];

export default function App() {
  const insets = useSafeAreaInsets();
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const allStations = useStationStore((s) => s.stations);

  const filteredStations = useMemo(
    () => allStations.filter(station => station.location === selectedCity),
    [allStations, selectedCity]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <StatusBar style='dark' />
      <View>
        <Header />
        <CityDropdown selectedCity={selectedCity} onSelectCity={setSelectedCity} />
        <StatusChips stations={filteredStations} />
      </View>
      <ScrollView className='mt-5'>
        <StationList stations={filteredStations} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  list: {
    paddingBottom: 24,
  }
})