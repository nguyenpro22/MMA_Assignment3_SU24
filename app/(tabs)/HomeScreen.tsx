import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFavorites } from "@/hooks/useFavoritesContext";
import { Orchid } from "@/constants/types";

type RootStackParamList = {
  HomeMain: undefined;
  DetailScreen: { orchid: Orchid };
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeMain"
>;

type Category = {
  name: string;
  items: Orchid[];
};

export default function HomeScreen() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://667a188118a459f639525072.mockapi.io/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const categories: Category[] = await response.json();

        const updatedCategories = categories.map((category) => ({
          ...category,
          items: category.items.map((item) => ({
            ...item,
            favorite: favorites.some((fav) => fav.name === item.name),
          })),
        }));

        setData(updatedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load orchids from API", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [favorites]);

  const renderOrchid = (item: Orchid, categoryName: string) => (
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
          <Text style={styles.favorite}>{item.favorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Orchid List</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {data.map((category) => (
          <View key={category.name}>
            <Text style={styles.categoryHeader}>{category.name}</Text>
            {category.items.map((item) => renderOrchid(item, category.name))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light blue background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  list: {
    padding: 16,
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
  categoryHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#1E88E5",
    textAlign: "center",
    backgroundColor: "#BBDEFB",
    padding: 8,
    borderRadius: 8,
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
  noDataText: {
    fontSize: 18,
    color: "#757575",
  },
});
