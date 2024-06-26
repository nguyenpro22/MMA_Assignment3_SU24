import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "@/hooks/useFavoritesContext";
import { Orchid } from "@/constants/types";

type RootStackParamList = {
  HomeMain: undefined;
  Detail: { orchid: Orchid };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Detail"
>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { orchid } = route.params;
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.name === orchid.name);

  const handleToggleFavorite = () => {
    toggleFavorite(orchid);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: orchid.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{orchid.name}</Text>
        <Text style={styles.detailText}>Weight: {orchid.weight}g</Text>
        <Text style={styles.detailText}>Rating: {orchid.rating}</Text>
        <Text style={styles.detailText}>Price: ${orchid.price}</Text>
        <Text style={styles.detailText}>Color: {orchid.color}</Text>
        <Text style={styles.detailText}>Bonus: {orchid.bonus}</Text>
        <Text style={styles.detailText}>Origin: {orchid.origin}</Text>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
        >
          <Text style={styles.favoriteText}>
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E3F2FD", // Light blue background
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#BBDEFB",
  },
  detailsContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 4,
  },
  favoriteButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    alignItems: "center",
  },
  favoriteButtonActive: {
    backgroundColor: "#ff1a1a",
  },
  favoriteText: {
    fontSize: 18,
    color: "#fff",
  },
});
