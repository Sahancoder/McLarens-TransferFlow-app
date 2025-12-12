import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowRight, User, Bell, Lock, HelpCircle, Shield, LogOut, ChevronRight } from 'lucide-react-native';
import { Card } from '../../../shared/components/Card';
import { colors, spacing, borderRadius } from '../../../shared/constants/theme';

interface AccountScreenProps {
  user: any;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export const AccountScreen = ({ user, onBack, onLogout, onNavigate }: AccountScreenProps) => {
  const menuItems = [
    { icon: User, label: 'Profile Information', screen: 'ProfileInfo' },
    { icon: Bell, label: 'Notifications', screen: 'Notifications' },
    { icon: Lock, label: 'Privacy & Security', screen: 'Privacy' },
    { icon: HelpCircle, label: 'Help & Support', screen: 'Support' },
    { icon: Shield, label: 'Terms & Policies', screen: 'Terms' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowRight size={24} color={colors.white} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account & Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Image 
              source={require('../../../../assets/pic1.png')} 
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileRole}>{user.role === 'dispatcher' ? 'Dispatcher' : `Driver • ${user.truck}`}</Text>
            <Text style={styles.profileEmail}>{user.email || 'No email set'}</Text>
          </View>
        </Card>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => onNavigate(item.screen)}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <item.icon size={20} color={colors.gray[600]} />
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={onLogout}
          style={styles.logoutButton}
          activeOpacity={0.7}
        >
          <LogOut size={20} color={colors.red[500]} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.gray[500],
  },
  menuSection: {
    marginBottom: spacing.xxl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray[100],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.red[50],
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.red[100],
    marginBottom: spacing.xxl,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.red[500],
  },
  version: {
    textAlign: 'center',
    color: colors.gray[400],
    fontSize: 12,
    marginBottom: spacing.xxl,
  },
});
