import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Share, Download, Trash2, Grid3X3 } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const imageSize = (screenWidth - 60) / 2;

const mockImages = [
  { id: 1, original: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', processed: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
  { id: 2, original: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop', processed: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop' },
  { id: 3, original: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop', processed: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop' },
  { id: 4, original: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=300&h=400&fit=crop', processed: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=300&h=400&fit=crop' },
];

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Library</Text>
          <Text style={styles.subtitle}>{mockImages.length} processed images</Text>
        </View>

        {mockImages.length > 0 ? (
          <>
            {/* Grid view toggle */}
            <View style={styles.viewToggle}>
              <TouchableOpacity style={styles.toggleButton}>
                <Grid3X3 color="#007AFF" size={20} />
                <Text style={styles.toggleText}>Grid View</Text>
              </TouchableOpacity>
            </View>

            {/* Images grid */}
            <View style={styles.imageGrid}>
              {mockImages.map((image) => (
                <TouchableOpacity key={image.id} style={styles.imageCard}>
                  <Image source={{ uri: image.processed }} style={styles.gridImage} />
                  <View style={styles.imageOverlay}>
                    <View style={styles.imageActions}>
                      <TouchableOpacity style={styles.actionIcon}>
                        <Share color="#FFFFFF" size={16} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionIcon}>
                        <Download color="#FFFFFF" size={16} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionIcon}>
                        <Trash2 color="#FFFFFF" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{mockImages.length}</Text>
                <Text style={styles.statLabel}>Images Processed</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2.4MB</Text>
                <Text style={styles.statLabel}>Storage Used</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4.2s</Text>
                <Text style={styles.statLabel}>Avg Process Time</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Grid3X3 color="#86868B" size={48} />
            </View>
            <Text style={styles.emptyTitle}>No images yet</Text>
            <Text style={styles.emptySubtitle}>
              Start by uploading and processing your first image
            </Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#86868B',
    fontWeight: '400',
  },
  viewToggle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 20,
  },
  imageCard: {
    width: imageSize,
    height: imageSize * 1.3,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    opacity: 0,
    justifyContent: 'flex-end',
    padding: 12,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#86868B',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#86868B',
    textAlign: 'center',
    lineHeight: 22,
  },
});