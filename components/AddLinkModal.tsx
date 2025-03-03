import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import AIService from '../services/ai/AIService';
// import { useTheme } from '../src/context/ThemeContext';

interface AddLinkModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, url: string, category: string) => void;
  existingCategories: string[];
  aiService?: AIService;
}

const AddLinkModal = ({ visible, onClose, onSubmit, existingCategories, aiService }: AddLinkModalProps) => {
  // const { theme } = useTheme();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  // const placeholderColor = theme === 'dark' ? '#888' : '#aaa';

  const handleSubmit = () => {
    if (!name.trim() || !url.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!category.trim()) {
      Alert.alert('Error', 'Please select or enter a category');
      return;
    }

    if (!showNewCategory && !existingCategories.includes(category)) {
      Alert.alert('Error', 'Please select a valid category or create a new one');
      return;
    }

    onSubmit(name.trim(), url.trim(), category.trim());
    setName('');
    setUrl('');
    setCategory('');
    setShowNewCategory(false);
    onClose();
  };

  const handleAISuggest = async () => {
    if (!url || !aiService) return;
    try {
      const suggestion = await aiService.suggestName(url);
      if (suggestion) setName(suggestion);
    } catch (error) {
      console.error('Failed to get AI suggestion:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={'#888'}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="URL"
            placeholderTextColor={'#888'}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
          />
          {!showNewCategory ? (
            <>
              <View style={styles.categoryContainer}>
                {existingCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryPill,
                      category === cat && styles.selectedPill,
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={[
                      styles.categoryText,
                      category === cat && styles.selectedText
                    ]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.newCategoryButton}
                onPress={() => setShowNewCategory(true)}
              >
                <Text style={styles.newCategoryText}>+ Add New Category</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="New Category"
            placeholderTextColor={'#888'}
              value={category}
              onChangeText={setCategory}
            />
          )}
          {/* <TouchableOpacity 
            style={[styles.aiButton, !url && styles.aiButtonDisabled]}
            onPress={handleAISuggest}
            disabled={!url}
          >
            
            <Text style={styles.aiButtonText}>🤖 Suggest Name</Text>
          </TouchableOpacity> */}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.submitText]}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    // backgroundColor: '',
    color: 'black',
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    margin: 4,
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
  newCategoryButton: {
    padding: 10,
    alignItems: 'center',
  },
  newCategoryText: {
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#007AFF',
  },
  submitText: {
    color: 'white',
  },
  aiButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginTop: 10,
  },
  aiButtonDisabled: {
    backgroundColor: '#ccc',
  },
  aiButtonText: {
    color: 'white',
  },
});

export default AddLinkModal; 