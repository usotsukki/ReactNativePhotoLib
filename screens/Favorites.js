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
import { styles } from "./Photos";

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
			<View style={styles.itemContainer}>
				<View style={styles.centerInner}>
					{/* Item-TopSection */}
					<Image
						source={{ uri: item.largeImageURL }}
						resizeMode="cover"
						style={styles.img}
					/>
					{/* {Item-BottomSection} */}
					{/* {Item-BottomSection} */}
					<View style={styles.itemDesc}>
						{/* Like/Dislike */}
						<View style={(styles.centerInner, styles.like)}>
							<TouchableOpacity onPress={() => handleDislike(item)}>
								<Ionicons color={"red"} size={30} name={"heart"} />
							</TouchableOpacity>
						</View>
						{/* Title */}
						<View style={{}}>
							<Text style={styles.itemText}>{item.tags}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.body}>
			<View style={styles.header}>
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
							numColumns={windowWidth > 1200 ? 3 : windowWidth > 800 ? 2 : 1}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}
