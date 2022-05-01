import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import Favorites from "../screens/Favorites";
import Photos from "../screens/Photos";

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
	let iconName;

	switch (route.name) {
		case "Photos":
			iconName = "view-list";
			break;
		case "Favorites":
			iconName = "star";
			break;
		default:
			break;
	}

	return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
};
const RootNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Photos"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color),
					tabBarActiveTintColor: "#FFFFFF",
					tabBarInactiveTintColor: "#FFFFFF50",
					tabBarShowLabel: false,
					headerShown: false,
					tabBarStyle: [
						{
							height: "10%",
							backgroundColor: "#1E1B26",
						},
					],
				})}
			>
				<Tab.Screen name="Photos" component={Photos} />
				<Tab.Screen name="Favorites" component={Favorites} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
