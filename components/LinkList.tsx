import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Clipboard,
  Alert,
  Animated,
} from 'react-native';
import { Link } from '../services/storage/StorageInterface';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Svg, Path } from 'react-native-svg';

type LinkListProps = {
  links: Link[];
  onDelete?: (id: string) => void;
};

const CopyIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF">
    <Path d="M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ArrowIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF">
    <Path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M15 3h6v6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M10 14L21 3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const TrashIcon = ({ width, height, fill }: { width: number; height: number; fill: string }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      fill={fill}
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </Svg>
);

const LinkList = ({ links, onDelete }: LinkListProps) => {
  const handlePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const handleCopy = async (url: string) => {
    await Clipboard.setString(url);
    Alert.alert('Success', 'Link copied to clipboard!');
  };

  const renderItem = ({ item }: { item: Link }) => (
    <View style={styles.rowFront}>
      <View style={styles.linkContent}>
        <Text style={styles.linkName}>{item.name}</Text>
        <Text 
          style={styles.linkUrl}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.url}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handleCopy(item.url)}
        >
          <CopyIcon />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handlePress(item.url)}
        >
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHiddenItem = ({ item }: { item: Link }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete?.(item.id)}
      >
        <TrashIcon width={24} height={24} fill="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={links}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowBack: {
    alignItems: 'flex-end',
    backgroundColor: '#FF3B30',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  linkContent: {
    flex: 1,
    paddingVertical: 4,
  },
  linkName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  linkUrl: {
    fontSize: 14,
    color: '#007AFF',
    opacity: 0.8,
    fontWeight: '500'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 8,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 75,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default LinkList; 