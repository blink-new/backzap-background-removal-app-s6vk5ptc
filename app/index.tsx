import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  useEffect(() => {
    // Navigate to onboarding on app start
    // In a real app, you'd check if user has seen onboarding before
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Loading or splash content could go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
  },
});