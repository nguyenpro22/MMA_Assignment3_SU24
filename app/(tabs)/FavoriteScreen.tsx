import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFavorites } from "@/hooks/useFavoritesContext";
import { Orchid } from "@/constants/types";

type RootStackParamList = {
  HomeMain: undefined;
  DetailScreen: { orchid: Orchid };
};

type FavoriteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DetailScreen"
>;

export default function FavoriteScreen() {
  const navigation = useNavigation<FavoriteScreenNavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();

  const renderOrchid = ({ item }: { item: Orchid }) => (
    <View style={styles.orchidCard} key={item.name}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailScreen", { orchid: item })}
        style={styles.orchidContent}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.orchidInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.origin}>Origin: {item.origin}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.favoriteButton}
        >
          <Text style={styles.favorite}>❌</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorite List</Text>
      </View>
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <Text style={styles.noFavoritesText}>No favorites added</Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderOrchid}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light blue background
  },
  header: {
    padding: 16,
    backgroundColor: "#42A5F5", // Blue header
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 80,
  },
  orchidCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderLeftWidth: 8,
    borderLeftColor: "#42A5F5", // Blue border
    borderTopWidth: 1,
    borderTopColor: "#BBDEFB",
  },
  orchidContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#BBDEFB",
  },
  orchidInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  origin: {
    fontSize: 14,
    color: "#757575",
  },
  favoriteButton: {
    padding: 10,
  },
  favorite: {
    fontSize: 24,
    color: "#FF6347",
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
    marginTop: 20,
  },
});
