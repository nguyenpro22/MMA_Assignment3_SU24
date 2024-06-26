import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Orchid = {
  name: string;
  weight: number;
  rating: string;
  price: number;
  isTopOfTheWeek: boolean;
  image: string;
  color: string;
  bonus: string;
  origin: string;
  category: string;
  favorite: boolean;
};

type FavoritesContextType = {
  favorites: Orchid[];
  toggleFavorite: (orchid: Orchid) => void;
  setFavorites: React.Dispatch<React.SetStateAction<Orchid[]>>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Orchid[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favoriteData = await AsyncStorage.getItem("favorites");
      const loadedFavorites = favoriteData ? JSON.parse(favoriteData) : [];
      setFavorites(loadedFavorites);
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (orchid: Orchid) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.name === orchid.name)) {
      updatedFavorites = favorites.filter((fav) => fav.name !== orchid.name);
    } else {
      updatedFavorites = [...favorites, orchid];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, setFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
