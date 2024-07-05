import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function ListScreen({ navigation }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/v1/books/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const item_book = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { bookId: item._id })}>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{new Date(item.year).getFullYear()}</Text>
                <Text>{item.author}</Text>
                <Text>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List of Books</Text>
            <FlatList
                keyExtractor={(item) => item._id.toString()}
                data={books}
                renderItem={item_book}
                ListEmptyComponent={<Text>No books available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
