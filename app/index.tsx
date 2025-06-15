import { getPokemon, Pokemon } from '@/api/pokeApi';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native';

const Page = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      setData(result);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My First App</Text>
      <View style={styles.grid}>
        {data.map((pokemon) => (
          <Link href={`/(pokeman)/${pokemon.id}`} key={pokemon.id} asChild>
            <TouchableOpacity style={styles.card}>
              <Image
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.pokemonId}>#{pokemon.id}</Text>
              <Text style={styles.pokemonName}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  pokemonId: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  textPageButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 50,
  },
  textPageButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Page;