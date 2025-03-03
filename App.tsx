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
  ActivityIndicator,
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
import Config from 'react-native-config';
import { mockLinks } from './services/mockData';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
// import { AIService } from './services/ai/AIService';

const localStorage = new LocalStorage();
// const aiService = new AIService(Config.GEMINI_API_KEY || '');

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
      setLinks(savedLinks || mockLinks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load links');
      setLinks(mockLinks);
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
      <Header onSignOut={() => Alert.alert('Sign Out', 'User signed out successfully')} />
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
        // aiService={aiService}
      />
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '382802203455-ehfhb74nojmbdrtb7lda2n0rflpel246.apps.googleusercontent.com', // Get this from Google Cloud Console
    });
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleSkip = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return showLogin ? (
      <LoginScreen
        onLogin={signInWithGoogle}
        onSignup={() => setShowLogin(false)}
        onSkip={handleSkip}
      />
    ) : (
      <SignupScreen
        onSignup={handleSignup}
        onLogin={() => setShowLogin(true)}
        onSkip={handleSkip}
      />
    );
  }

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
