import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

type LinkFormProps = {
  onSubmit: (name: string, url: string) => void;
};

const LinkForm = ({ onSubmit }: LinkFormProps) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (name.trim() && url.trim()) {
      onSubmit(name, url);
      setName('');
      setUrl('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter link name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter URL"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LinkForm; 