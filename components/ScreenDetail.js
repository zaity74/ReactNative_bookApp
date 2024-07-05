import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function BookDetailsScreen({ route, navigation }) {
    const { bookId } = route.params;
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [book, setBook] = useState({
        title: '',
        description: '',
        year: '',
        author: '',
        category: '',
    });

    useEffect(() => {
        fetchBookDetails();
    }, []);

    const fetchBookDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:7000/api/v1/books/books/${bookId}`);
            const data = await response.json();
            setBookDetails(data);
            setBook({
                title: data.title,
                description: data.description,
                year: new Date(data.year).getFullYear().toString(),
                author: data.author,
                category: data.category,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching book details:', error);
            setLoading(false);
            Alert.alert('Error', 'Failed to fetch book details');
        }
    };

    const handleUpdateBook = async () => {
        try {
            const response = await fetch(`http://localhost:7000/api/v1/books/update-books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                Alert.alert('Success', 'Book updated successfully!');
                setIsEditing(false);
                fetchBookDetails(); // Refresh the book details after update
            } else {
                Alert.alert('Error', 'Failed to update book');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {bookDetails && !loading && !isEditing && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailItem}>Title: {bookDetails.title}</Text>
                    <Text style={styles.detailItem}>Description: {bookDetails.description}</Text>
                    <Text style={styles.detailItem}>Year: {new Date(bookDetails.year).getFullYear()}</Text>
                    <Text style={styles.detailItem}>Author: {bookDetails.author}</Text>
                    <Text style={styles.detailItem}>Category: {bookDetails.category}</Text>
                    <Button title="Edit Book" onPress={() => setIsEditing(true)} />
                </View>
            )}
            {isEditing && (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={book.title}
                        onChangeText={(text) => setBook({ ...book, title: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={book.description}
                        onChangeText={(text) => setBook({ ...book, description: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Year"
                        value={book.year}
                        onChangeText={(text) => setBook({ ...book, year: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Author"
                        value={book.author}
                        onChangeText={(text) => setBook({ ...book, author: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        value={book.category}
                        onChangeText={(text) => setBook({ ...book, category: text })}
                    />
                    <Button title="Update Book" onPress={handleUpdateBook} />
                    <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
                </View>
            )}
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
    detailsContainer: {
        marginTop: 20,
    },
    detailItem: {
        fontSize: 18,
        marginBottom: 10,
    },
    formContainer: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
