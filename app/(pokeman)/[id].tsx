import { getPokemonDetails, Pokemon } from '@/api/pokeApi';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const PokemonDetailed = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const [details, setDetails] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const detail = await getPokemonDetails(id);
                setDetails(Array.isArray(detail) ? detail[0] : detail); // Handle both array and single object
                console.log("Pokemon detail:", detail);
            } catch (err) {
                
                setError("Failed to load Pokemon details");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Loading Pokemon #{id}...</Text>
            </View>
        );
    }

    if (error || !details) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || "Pokemon not found"}</Text>
            </View>
        );
    }

    // Capitalize first letter of pokemon name
    const capitalizedName = details.name.charAt(0).toUpperCase() + details.name.slice(1);

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: capitalizedName }} />
            
            <View style={styles.header}>
                <Image 
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                    style={styles.pokemonImage} 
                    resizeMode="contain"
                />
                <Text style={styles.pokemonName}>{capitalizedName}</Text>
                <Text style={styles.pokemonId}>#{id}</Text>
            </View>

            {/* Display Pokemon types */}
            {details.types && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Types</Text>
                    <View style={styles.typesContainer}>
                        {details.types.map((typeInfo: any, index: number) => (
                            <View key={index} style={styles.typeTag}>
                                <Text style={styles.typeText}>
                                    {typeInfo.type.name.toUpperCase()}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Display Pokemon stats */}
            {details.stats && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Stats</Text>
                    {details.stats.map((statInfo: any, index: number) => (
                        <View key={index} style={styles.statRow}>
                            <Text style={styles.statName}>
                                {statInfo.stat.name.replace('-', ' ').toUpperCase()}:
                            </Text>
                            <Text style={styles.statValue}>{statInfo.base_stat}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Display Pokemon abilities */}
            {details.abilities && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Abilities</Text>
                    {details.abilities.map((abilityInfo: any, index: number) => (
                        <Text key={index} style={styles.abilityText}>
                            {abilityInfo.ability.name.replace('-', ' ')}
                            {abilityInfo.is_hidden && " (Hidden)"}
                        </Text>
                    ))}
                </View>
            )}

            {/* Display Pokemon measurements */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Measurements</Text>
                <View style={styles.measurementsContainer}>
                    <View style={styles.measurementItem}>
                        <Text style={styles.measurementValue}>{details.height / 10} m</Text>
                        <Text style={styles.measurementLabel}>Height</Text>
                    </View>
                    <View style={styles.measurementItem}>
                        <Text style={styles.measurementValue}>{details.weight / 10} kg</Text>
                        <Text style={styles.measurementLabel}>Weight</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

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
        fontSize: 16,
        marginTop: 10,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#e74c3c',
        textAlign: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    pokemonImage: {
        width: 200,
        height: 200,
    },
    pokemonName: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 8,
    },
    pokemonId: {
        fontSize: 18,
        color: '#666',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    typeTag: {
        backgroundColor: '#e1f5fe',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    typeText: {
        fontSize: 14,
        color: '#0277bd',
        fontWeight: '500',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    statName: {
        fontSize: 16,
        color: '#333',
    },
    statValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    abilityText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 4,
    },
    measurementsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    measurementItem: {
        alignItems: 'center',
    },
    measurementValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    measurementLabel: {
        fontSize: 14,
        color: '#666',
    },
});

export default PokemonDetailed