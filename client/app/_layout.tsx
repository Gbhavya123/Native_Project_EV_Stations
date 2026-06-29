import '../global.css';
import { useSocket } from '@/hooks/useSocket';
import { Stack } from "expo-router";

export default function RootLayout() {
  useSocket();
  return <Stack screenOptions={{ headerShown: false }} />;
}
