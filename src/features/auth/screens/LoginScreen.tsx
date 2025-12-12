import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Truck, LayoutDashboard } from 'lucide-react-native';
import { Button } from '../../../shared/components/Button';
import { colors, spacing, borderRadius, shadows } from '../../../shared/constants/theme';

interface LoginScreenProps {
  onLogin: (role: 'dispatcher' | 'driver') => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Combined pulse and glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      {/* Background decorations - Top Right Circle with Animation */}
      <Animated.View 
        style={[
          styles.bgDecorationTopRight,
          {
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
      
      {/* Background decorations - Bottom Left Circle with Animation */}
      <Animated.View 
        style={[
          styles.bgDecorationBottomLeft,
          {
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
      
      <View style={styles.contentTop}>
        <View style={styles.iconContainer}>
          <Truck size={40} color={colors.dark} />
        </View>
        <Text style={styles.title}>
          McLarens{'\n'}
          <Text style={styles.titleAccent}>TransferFlow</Text>
        </Text>
        <Text style={styles.subtitle}>
          Inter-Terminal Transfer Booking & Tracking System
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={() => onLogin('dispatcher')} variant="primary" icon={LayoutDashboard}>
          Login as Dispatcher
        </Button>
        <Button 
          onPress={() => onLogin('driver')} 
          variant="outline" 
          style={styles.driverButton}
          icon={Truck}
        >
          <Text style={styles.driverButtonText}>Login as Driver</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: spacing.xxl,
    justifyContent: 'space-between',
    position: 'relative',
  },
  bgDecorationTopRight: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: colors.primary,
    opacity: 0.15,
    borderRadius: borderRadius.full,
  },
  bgDecorationBottomLeft: {
    position: 'absolute',
    bottom: -120,
    left: -120,
    width: 280,
    height: 280,
    backgroundColor: colors.primary,
    opacity: 0.12,
    borderRadius: borderRadius.full,
  },
  contentTop: {
    marginTop: 20,
    zIndex: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    ...shadows.yellow,
  },
  title: {
    fontSize: 52,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 60,
  },
  titleAccent: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.gray[400],
    marginTop: spacing.lg,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    gap: spacing.lg,
    marginBottom: 120,
    zIndex: 10,
  },
  driverButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  driverButtonText: {
    color: colors.white,
  },
});
