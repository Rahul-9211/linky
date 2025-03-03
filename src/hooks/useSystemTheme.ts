import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

export const useSystemTheme = (): ThemeType => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
}; 