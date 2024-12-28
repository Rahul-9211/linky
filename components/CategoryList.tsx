import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryList = ({ categories, selectedCategory, onSelectCategory }: CategoryListProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.categoryPill,
            !selectedCategory && styles.selectedPill,
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text style={[
            styles.categoryText,
            !selectedCategory && styles.selectedText
          ]}>All</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryPill,
              selectedCategory === category && styles.selectedPill,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedText
            ]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedPill: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
});

export default CategoryList; 