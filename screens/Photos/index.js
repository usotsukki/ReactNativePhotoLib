import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Dimensions, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItems, like, dislike, setQuery } from "../../redux/actions";
import { styles } from "../../styles";
import Item from "../../components/Item";

const windowWidth = Dimensions.get("window").width;

export default function Photos() {
	//redux
	const { items, favorites, query } = useSelector((state) => state.photos);
	const dispatch = useDispatch();

	const fetchItems = () => dispatch(getItems(query));
	const handleLike = (item) => dispatch(like(item));
	const handleDislike = (item) => dispatch(dislike(item));
	const searchQuery = (string) => dispatch(setQuery(string));

	// fetching Photos
	useEffect(() => {
		fetchItems();
	}, [query]);

	// searching logic
	const search = debounce((input) => searchQuery(input), 300);

	const ifExists = (item) => favorites.find((e) => e.id == item.id);

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
						renderItem={({ item }) => (
							<Item
								item={item}
								handleLike={handleLike}
								handleDislike={handleDislike}
								ifExists={ifExists}
							/>
						)}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
