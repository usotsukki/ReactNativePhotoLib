import React from "react";
import { SafeAreaView, Text, View, FlatList, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { dislike } from "../../redux/actions";
import { styles } from "../../styles";
import Item from "../../components/Item";

const windowWidth = Dimensions.get("window").width;

export default () => {
	// redux
	const { favorites } = useSelector((state) => state.photos);

	const dispatch = useDispatch();

	const handleDislike = (likedItem) => dispatch(dislike(likedItem));

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
							renderItem={({ item }) => (
								<Item item={item} handleDislike={handleDislike} />
							)}
							numColumns={windowWidth > 1200 ? 3 : windowWidth > 800 ? 2 : 1}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};
