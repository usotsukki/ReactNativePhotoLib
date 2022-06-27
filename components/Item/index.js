import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles";

export default ({ item, handleDislike, handleLike, ifExists }) => {
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
							onPress={
								handleLike
									? () =>
											ifExists(item) ? handleDislike(item) : handleLike(item)
									: () => handleDislike(item)
							}
						>
							<Ionicons
								color={ifExists ? (ifExists(item) ? "red" : "white") : "red"}
								size={30}
								name={
									ifExists
										? ifExists(item)
											? "heart"
											: "heart-outline"
										: "heart"
								}
							/>
						</TouchableOpacity>
					</View>
					{/* Title */}
					<View>
						<Text style={styles.itemText}>{item.tags}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
