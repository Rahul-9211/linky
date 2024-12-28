import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageInterface, Link } from './StorageInterface';

const LINKS_STORAGE_KEY = '@linky_links';

export class LocalStorage implements StorageInterface {
  async saveLinks(links: Link[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(links);
      await AsyncStorage.setItem(LINKS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving links:', error);
      throw error;
    }
  }

  async getLinks(): Promise<Link[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(LINKS_STORAGE_KEY);
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error getting links:', error);
      throw error;
    }
  }
} 