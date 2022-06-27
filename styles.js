import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

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
