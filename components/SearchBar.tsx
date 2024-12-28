import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search links..."
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default SearchBar; 