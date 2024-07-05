import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function UpdateScreen({ navigation, route }) {
  // const { bookId } = route.params;
  const [selectedTitle, setSelectedTitle] = useState('');
  const [book, setBook] = useState({
    title: "",
    description: "",
    year: "",
    author: "",
    category: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/v1/books/books");
      const data = await response.json();
      setBook(data);

      console.log(book)
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleUpdateBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/v1/books/books/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );
      if (response.ok) {
        Alert.alert("Success", "Book updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Book</Text>
      <Picker
        selectedValue={selectedTitle}
        onValueChange={(itemValue) => {
          setSelectedTitle(itemValue);
          fetchBookDetails(itemValue);
        }}
        style={styles.picker}
      >
        {book && book.map((booked) => (
          <Picker.Item key={booked._id} label={booked.title} value={booked.title} />
        ))}
      </Picker>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    marginBottom: 16,
    },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
