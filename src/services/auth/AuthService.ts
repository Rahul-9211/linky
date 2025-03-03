import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService {
  constructor() {
    GoogleSignin.configure({
      // Get this from Google Cloud Console
      webClientId: '123456789-abcdef.apps.googleusercontent.com',
      iosClientId: 'YOUR_IOS_CLIENT_ID',
    });
  }

  async signIn(): Promise<User | null> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      return userInfo;
    } catch (error) {
      console.error('Sign-in error:', error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  async isSignedIn(): Promise<boolean> {
    try {
      return await GoogleSignin.isSignedIn();
    } catch (error) {
      return false;
    }
  }
} 