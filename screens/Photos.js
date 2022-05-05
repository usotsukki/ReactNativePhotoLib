import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions,
	TextInput,
	StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash.debounce";

import { getItems, like, dislike, setQuery } from "../redux/actions";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

export default function Photos() {
	//redux
	const { items, favorites, query } = useSelector((state) => state.photos);
	const dispatch = useDispatch();

	const fetchItems = () => dispatch(getItems(query));
	const addToFavorites = (item) => dispatch(like(item));
	const removeFromFavorites = (item) => dispatch(dislike(item));
	const searchQuery = (string) => dispatch(setQuery(string));

	// fetching "OnMount" and aborting on 'UnMount'
	useEffect(() => {
		fetchItems();
	}, [query]);

	// searching logic

	const rawSearch = (input) => {
		searchQuery(input);
	};

	// debouncing search here prevents memory leaks warnings + is overall good practice, I think
	const search = debounce((item) => rawSearch(item), 300);

	// likes logic
	const handleLike = (item) => {
		addToFavorites(item);
	};

	const handleDislike = (item) => {
		removeFromFavorites(item);
	};
	const ifExists = (item) =>
		favorites.filter((e) => e.id == item.id).length > 0;

	// logic for FlatList rendering
	const renderItem = ({ item }) => {
		return (
			<View style={(styles.centerInner, styles.itemContainer)}>
				<View style={styles.centerInner}>
					{/* Item-TopSection */}
					<Image
						source={{ uri: item.largeImageURL }}
						resizeMode="cover"
						style={styles.img}
					/>
					{/* {Item-BottomSection} */}
					<View style={styles.itemDesc}>
						{/* Like/Dislike */}
						<View style={(styles.centerInner, styles.like)}>
							<TouchableOpacity
								onPress={() =>
									ifExists(item) ? handleDislike(item) : handleLike(item)
								}
							>
								<Ionicons
									color={ifExists(item) ? "red" : "white"}
									size={30}
									name={ifExists(item) ? "heart" : "heart-outline"}
								/>
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
				<Text style={{ color: "white", fontSize: 22 }}>Photos</Text>
				<View style={styles.search}>
					<Ionicons
						color={"#ffffff40"}
						size={15}
						name={"search"}
						style={{ position: "absolute", paddingRight: 200 }}
					/>
					<TextInput
						placeholder="Search"
						style={styles.searchInput}
						onChangeText={(input) => search(input)}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<FlatList
						data={items}
						keyExtractor={(item) => item.id.toString()}
						numColumns={windowWidth > 1200 ? 3 : windowWidth > 800 ? 2 : 1}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
export const styles = StyleSheet.create({
	itemContainer: {
		width: windowWidth * 0.9,
		maxWidth: windowWidth > 600 ? 400 : 500,
		marginVertical: 10,
	},
	centerInner: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	like: {
		marginRight: 10,
	},
	itemText: {
		fontSize: 16,
		color: "white",
		textTransform: "capitalize",
	},
	searchInput: {
		width: "80%",
		position: "absolute",
		margin: 5,
		height: 30,
		borderWidth: 1,
		borderColor: "#ffffff40",
		borderRadius: 15,
		textAlign: "center",
		color: "#f3f3f3",
	},
	search: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: windowWidth * 0.8,
		maxWidth: 600,
		maxHeight: 40,
	},
	header: {
		flex: 1,
		paddingHorizontal: 16,
		alignItems: "center",
	},
	body: {
		paddingTop: 25,
		flex: 1,
		backgroundColor: "#1E1B26",
		alignItems: "center",
	},
	itemDesc: {
		flex: 1,
		flexDirection: "row",
		width: windowWidth * 0.9,
		maxWidth: windowWidth > 600 ? 350 : 500,
		borderBottomWidth: 1,
		borderBottomColor: "#ffffff20",
		padding: 10,
		paddingHorizontal: 30,
		justifyContent: "space-between",
	},
	img: {
		width: windowWidth * 0.8,
		maxWidth: windowWidth > 600 ? 350 : 500,
		height: windowWidth * 0.8,
		maxHeight: windowWidth > 600 ? 350 : 500,
		borderRadius: 10,
	},
});
