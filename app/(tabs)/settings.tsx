import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import {
  User,
  Palette,
  Globe,
  Shield,
  HelpCircle,
  Star,
  ChevronRight,
  Bell,
  Download,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(false);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    showSwitch, 
    switchValue, 
    onSwitchChange 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingIcon}>
          <Icon color="#007AFF" size={20} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E5E5E7', true: '#007AFF' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <ChevronRight color="#C7C7CC" size={16} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your BackZap experience</Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <SettingItem
              icon={User}
              title="Profile"
              subtitle="Manage your account details"
              onPress={() => {}}
            />
            <SettingItem
              icon={Shield}
              title="Privacy & Security"
              subtitle="Control your data and privacy"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingItem
              icon={Bell}
              title="Notifications"
              subtitle="Processing updates and tips"
              showSwitch
              switchValue={notifications}
              onSwitchChange={setNotifications}
            />
            <SettingItem
              icon={Download}
              title="Auto-save to Gallery"
              subtitle="Automatically save processed images"
              showSwitch
              switchValue={autoSave}
              onSwitchChange={setAutoSave}
            />
            <SettingItem
              icon={Palette}
              title="Appearance"
              subtitle="Light mode, dark mode"
              onPress={() => {}}
            />
            <SettingItem
              icon={Globe}
              title="Language"
              subtitle="English"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help with BackZap features"
              onPress={() => {}}
            />
            <SettingItem
              icon={Star}
              title="Rate BackZap"
              subtitle="Share your feedback"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>BackZap</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2024 BackZap Technologies</Text>
        </View>
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
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#86868B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E7',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#86868B',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#86868B',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: '#C7C7CC',
  },
});