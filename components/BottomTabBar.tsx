import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type BottomTabBarProps = {
  onAddPress: () => void;
};

const BottomTabBar = ({ onAddPress }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AddButton onPress={onAddPress} />
      </View>
    </View>
  );
};

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <View style={styles.addButtonInner}>
      <Text style={styles.addButtonText}>+</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  content: {
    alignItems: 'center',
    paddingTop: 12,
  },
  addButton: {
    marginTop: -40,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default BottomTabBar; 