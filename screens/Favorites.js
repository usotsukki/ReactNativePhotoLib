import React from "react";
import {
	SafeAreaView,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { dislike } from "../redux/actions";

const windowWidth = Dimensions.get("window").width;

export default function Favorites() {
	// redux
	const { favorites } = useSelector((state) => state.photos);

	const dispatch = useDispatch();

	const removeFromFavorites = (likedItem) => dispatch(dislike(likedItem));

	// only dislikes in favorites
	const handleDislike = (likedItem) => {
		removeFromFavorites(likedItem);
	};

	//using same renderItem as in [Photos], just simlified.
	// exporting/importing this and rendering with Flatlist  causes bugs

	const renderItem = ({ item }) => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					width: windowWidth * 0.9,
					maxWidth: windowWidth > 600 ? 250 : 500,
					marginVertical: 10,
				}}
			>
				<View style={{ flex: 1, alignItems: "center" }}>
					{/* Item-TopSection */}
					<Image
						source={{ uri: item.url }}
						resizeMode="cover"
						style={{
							width: windowWidth * 0.8,
							maxWidth: windowWidth > 600 ? 200 : 400,
							height: windowWidth * 0.8,
							maxHeight: windowWidth > 600 ? 200 : 400,
							borderRadius: 10,
						}}
					/>
					{/* {Item-BottomSection} */}
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							width: windowWidth * 0.9,
							maxWidth: windowWidth > 600 ? 200 : 400,
							borderBottomWidth: 1,
							borderBottomColor: "#ffffff20",
							padding: 10,
						}}
					>
						{/* Like/Dislike */}
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								marginRight: 10,
							}}
						>
							<TouchableOpacity onPress={() => handleDislike(item)}>
								<Ionicons color={"red"} size={30} name={"heart"} />
							</TouchableOpacity>
						</View>
						{/* Title */}
						<View
							style={{
								width: "80%",
							}}
						>
							<Text
								style={{
									fontSize: 16,
									color: "white",
									textTransform: "capitalize",
								}}
							>
								{item.title}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView
			style={{
				paddingTop: 25,
				flex: 1,
				backgroundColor: "#1E1B26",
				alignItems: "center",
			}}
		>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 16,
					alignItems: "center",
				}}
			>
				<Text style={{ color: "white", fontSize: 22 }}>Favorites</Text>
				<View style={{ flex: 1, marginTop: 8 }}>
					{favorites.length === 0 ? (
						<Text style={{ color: "#64676D", fontSize: 18 }}>
							Add an item to favorites.
						</Text>
					) : (
						<FlatList
							data={favorites}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderItem}
							numColumns={
								windowWidth > 1100
									? 4
									: windowWidth > 750
									? 3
									: windowWidth > 600
									? 2
									: 1
							}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}
