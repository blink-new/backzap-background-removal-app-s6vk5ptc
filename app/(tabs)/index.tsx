import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  Upload,
  Wand2,
  Download,
  Eye,
  EyeOff,
  RotateCcw,
  Share,
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleUpload = () => {
    // Mock image selection
    setSelectedImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop');
    setShowComparison(false);
  };

  const handleRemoveBackground = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowComparison(true);
    }, 2000);
  };

  const sampleOriginal = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop';
  // TODO: Replace this with the actual URL of the processed image with transparent background (PNG with alpha channel)
  const sampleProcessed = 'https://via.placeholder.com/400x600.png?text=Processed+Image'; // Placeholder URL

  const toggleView = () => {
    setShowOriginal(!showOriginal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>BackZap</Text>
          <Text style={styles.subtitle}>Remove backgrounds instantly</Text>
        </View>

        {/* Main editing area */}
        <View style={styles.editingArea}>
          {selectedImage ? (
            <View style={styles.imageContainer}>
              {showComparison ? (
                // Before/After Comparison View
                <View style={styles.comparisonContainer}>
                  {/* Side-by-side comparison */}
                  <View style={styles.resultsImagesContainer}>
                    <Image
                      source={{ uri: sampleOriginal }}
                      style={[
                        styles.resultImage,
                        {
                          borderRadius: 16,
                          width: '50%',
                          height: '100%',
                        },
                      ]}
                      resizeMode="cover"
                    />
                    <Image
                      source={{ uri: sampleProcessed }}
                      style={[
                        styles.resultImage,
                        {
                          borderRadius: 16,
                          width: '50%',
                          height: '100%',
                          backgroundColor: 'transparent',
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Toggle View Button */}
                  <View style={styles.viewToggleContainer}>
                    <TouchableOpacity
                      style={styles.viewToggleButton}
                      onPress={toggleView}
                    >
                      {showOriginal ? (
                        <>
                          <EyeOff color="#007AFF" size={20} />
                          <Text style={styles.viewToggleText}>Show Processed</Text>
                        </>
                      ) : (
                        <>
                          <Eye color="#007AFF" size={20} />
                          <Text style={styles.viewToggleText}>Show Original</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Full image overlay when toggling */}
                  {showOriginal && (
                    <View style={styles.fullImageOverlay}>
                      <Image
                        source={{ uri: sampleOriginal }}
                        style={[
                          styles.fullOverlayImage,
                          {
                            borderRadius: 12,
                            width: '90%',
                            height: '90%',
                          },
                        ]}
                        resizeMode="cover"
                      />
                      <View style={styles.overlayLabel}>
                        <Text style={styles.overlayLabelText}>Original Image</Text>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                // Single image view (before processing)
                <View style={styles.singleImageContainer}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.selectedImage}
                    resizeMode="cover"
                  />

                  {/* Processing overlay */}
                  {isProcessing && (
                    <View style={styles.processingOverlay}>
                      <View style={styles.processingContent}>
                        <Animated.View style={styles.processingIcon}>
                          <Wand2 color="#FFFFFF" size={24} />
                        </Animated.View>
                        <Text style={styles.processingText}>Removing background...</Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.uploadArea}>
              <View style={styles.uploadIcon}>
                <Upload color="#007AFF" size={48} />
              </View>
              <Text style={styles.uploadTitle}>Select a photo</Text>
              <Text style={styles.uploadSubtitle}>
                Choose an image to remove its background
              </Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Text style={styles.uploadButtonText}>Choose Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Action buttons */}
        {selectedImage && (
          <View style={styles.actionButtons}>
            {!showComparison ? (
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
                onPress={handleRemoveBackground}
                disabled={isProcessing}
              >
                <Wand2 color="#FFFFFF" size={20} />
                <Text style={styles.primaryButtonText}>
                  {isProcessing ? 'Processing...' : 'Remove Background'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.processedActions}>
                <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                  <Download color="#FFFFFF" size={20} />
                  <Text style={styles.primaryButtonText}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                  <Share color="#007AFF" size={20} />
                  <Text style={styles.secondaryButtonText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.tertiaryButton]}
                  onPress={() => {
                    setSelectedImage(null);
                    setShowComparison(false);
                  }}
                >
                  <RotateCcw color="#86868B" size={20} />
                  <Text style={styles.tertiaryButtonText}>New Image</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Results summary */}
        {showComparison && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>✨ Background Removed Successfully!</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Processing Time</Text>
                <Text style={styles.statValue}>1.8s</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Quality</Text>
                <Text style={styles.statValue}>High</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Format</Text>
                <Text style={styles.statValue}>PNG</Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick tips */}
        {!selectedImage && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for best results:</Text>
            <Text style={styles.tipText}>• Use photos with clear subject contrast</Text>
            <Text style={styles.tipText}>• Avoid complex backgrounds when possible</Text>
            <Text style={styles.tipText}>• Portrait photos work exceptionally well</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#86868B',
    fontWeight: '400',
  },
  editingArea: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  singleImageContainer: {
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 400,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processingContent: {
    alignItems: 'center',
  },
  processingIcon: {
    marginBottom: 16,
  },
  processingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  comparisonContainer: {
    position: 'relative',
  },
  resultsImagesContainer: {
    flexDirection: 'row',
    height: 400,
  },
  resultImage: {
    flex: 1,
    width: '50%',
    height: '100%',
    borderRadius: 16,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  sideBySideContainer: {
    flexDirection: 'row',
    height: 400,
  },
  imageHalf: {
    flex: 1,
    position: 'relative',
  },
  processedBackground: {
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comparisonImage: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: 2,
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  viewToggleContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  viewToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewToggleText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
  fullImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullOverlayImage: {
    width: '90%',
    height: '90%',
    borderRadius: 12,
  },
  overlayLabel: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  overlayLabelText: {
    color: '#1D1D1F',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E7',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 16,
    color: '#86868B',
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    paddingHorizontal: 20,
  },
  processedActions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tertiaryButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1.5,
    borderColor: '#E5E5E7',
  },
  tertiaryButtonText: {
    color: '#86868B',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F0F8FF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#007AFF20',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#86868B',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    color: '#1D1D1F',
    fontWeight: '600',
  },
  tipsContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#86868B',
    lineHeight: 20,
    marginBottom: 4,
  },
});