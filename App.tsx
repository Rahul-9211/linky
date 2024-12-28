/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinkList from './components/LinkList';
import AddLinkModal from './components/AddLinkModal';
import SearchBar from './components/SearchBar';
import { StorageProvider } from './services/storage/StorageContext';
import { LocalStorage } from './services/storage/LocalStorage';
import { useStorage } from './services/storage/StorageContext';
import { SearchService } from './services/search/SearchService';
import BottomTabBar from './components/BottomTabBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link } from './services/storage/StorageInterface';
import CategoryList from './components/CategoryList';

const localStorage = new LocalStorage();

function AppContent(): React.JSX.Element {
  const [links, setLinks] = useState<Link[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchService, setSearchService] = useState<SearchService | null>(null);
  const storage = useStorage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadLinks();
  }, []);

  useEffect(() => {
    if (links.length > 0) {
      const uniqueCategories = Array.from(new Set(links.map(link => link.category)));
      setCategories(uniqueCategories);
      setSearchService(new SearchService(links));
      filterLinks(searchQuery, selectedCategory);
    } else {
      setCategories([]);
      setSearchService(null);
      setFilteredLinks([]);
    }
  }, [links]);

  const filterLinks = useCallback((query: string, category: string | null) => {
    let results = links;
    
    if (category) {
      results = results.filter(link => link.category === category);
    }
    
    if (query.trim() && searchService) {
      results = searchService.search(query);
      if (category) {
        results = results.filter(link => link.category === category);
      }
    }
    
    setFilteredLinks(results);
  }, [links, searchService]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    filterLinks(query, selectedCategory);
  }, [filterLinks, selectedCategory]);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
    filterLinks(searchQuery, category);
  }, [filterLinks, searchQuery]);

  const loadLinks = async () => {
    try {
      const savedLinks = await storage.getLinks();
      setLinks(savedLinks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load links');
    }
  };

  const handleAddLink = async (name: string, url: string, category: string) => {
    try {
      const newLink: Link = {
        id: Date.now().toString(),
        name,
        url: url.toLowerCase().startsWith('http') ? url : `https://${url}`,
        createdAt: Date.now(),
        category,
      };
      const updatedLinks = [newLink, ...links];
      await storage.saveLinks(updatedLinks);
      setLinks(updatedLinks);
      searchService?.updateIndex(updatedLinks);
    } catch (error) {
      Alert.alert('Error', 'Failed to save link');
    }
  };

  const handleDeleteLink = async (id: string) => {
    Alert.alert(
      'Delete Link',
      'Are you sure you want to delete this link?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const updatedLinks = links.filter(link => link.id !== id);
              console.log("🚀 ~ onPress: ~ updatedLinks:", updatedLinks)
              await storage.saveLinks(updatedLinks);
              setLinks(updatedLinks);
              searchService?.updateIndex(updatedLinks);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete link');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <View style={styles.content}>
        <LinkList links={filteredLinks} onDelete={handleDeleteLink} />
      </View>
      <BottomTabBar onAddPress={() => setModalVisible(true)} />
      <AddLinkModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddLink}
        existingCategories={categories}
      />
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StorageProvider storage={localStorage}>
        <AppContent />
      </StorageProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
