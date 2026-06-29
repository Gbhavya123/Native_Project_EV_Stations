import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View, } from "react-native";

const cities = ["Bangalore, KA", "Delhi, DL", "Mumbai, MH",];

interface Props {
    selectedCity: string;
    onSelectCity: (city: string) => void;
}

export default function CityDropdown({ selectedCity, onSelectCity }: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Dropdown */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setVisible(true)}
                className="mx-5 mt-4 flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-4"
            >
                <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={22} color="#2563EB" />
                    <Text className="ml-3 text-lg font-semibold text-gray-900">
                        {selectedCity}
                    </Text>
                </View>
                <Ionicons name="chevron-down-outline" size={20} color="#6B7280" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className="flex-1 bg-black/30 mt-40 px-6"
                    onPress={() => setVisible(false)}
                >
                    <View className="rounded-2xl bg-white overflow-hidden">
                        {cities.map((city) => (
                            <TouchableOpacity
                                key={city}
                                onPress={() => {
                                    onSelectCity(city);
                                    setVisible(false);
                                }}
                                className="flex-row items-center justify-between border-t border-gray-200 px-5 py-4"
                            >
                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="location-outline"
                                        size={20}
                                        color="#2563EB"
                                    />
                                    <Text className="ml-3 text-lg">
                                        {city}
                                    </Text>
                                </View>

                                {selectedCity === city && (
                                    <Ionicons
                                        name="checkmark"
                                        size={22}
                                        color="#2563EB"
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}