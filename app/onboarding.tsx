import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Wand2, Image as ImageIcon, Download } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to BackZap',
    subtitle: 'The fastest way to remove backgrounds from your photos',
    description: 'Transform your images with just one tap using our powerful AI technology.',
    icon: Wand2,
    color: '#007AFF',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Upload Any Photo',
    subtitle: 'Select from gallery or take a new photo',
    description: 'Works best with clear subjects and good lighting. Portrait photos give amazing results.',
    icon: ImageIcon,
    color: '#34C759',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Instant Processing',
    subtitle: 'AI removes backgrounds in seconds',
    description: 'Our advanced algorithms automatically detect and remove backgrounds with precision.',
    icon: Wand2,
    color: '#FF9500',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Save & Share',
    subtitle: 'Download or share your creations',
    description: 'Save to your gallery, share on social media, or use in your projects.',
    icon: Download,
    color: '#007AFF',
    image: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=300&h=400&fit=crop',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Step indicator */}
        <View style={styles.stepIndicator}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === currentStep && styles.stepDotActive,
              ]}
            />
          ))}
        </View>

        {/* Main illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.iconBackground, { backgroundColor: `${step.color}15` }]}>
            <step.icon color={step.color} size={48} />
          </View>
          <Image source={{ uri: step.image }} style={styles.sampleImage} />
        </View>

        {/* Text content */}
        <View style={styles.textContent}>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.subtitle}>{step.subtitle}</Text>
          <Text style={styles.description}>{step.description}</Text>
        </View>
      </View>

      {/* Bottom actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#86868B',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E7',
  },
  stepDotActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  sampleImage: {
    width: 200,
    height: 260,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  textContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#86868B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});