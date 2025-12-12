import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, borderRadius, spacing } from '../constants/theme';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  style?: any;
  disabled?: boolean;
  icon?: LucideIcon;
  loading?: boolean;
}

export const Button = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  style, 
  disabled = false, 
  icon: Icon,
  loading = false
}: ButtonProps) => {
  const buttonStyle = [styles.base, styles[variant], disabled && styles.disabled, style];
  const textStyle = [styles.text, styles[`${variant}Text` as keyof typeof styles]];
  
  // Determine icon color based on variant
  const getIconColor = () => {
    if (variant === 'secondary' || variant === 'success') return colors.white;
    if (variant === 'outline') {
      // Check if it's the driver button (has white background) via style prop
      if (style && style.backgroundColor === 'rgba(255, 255, 255, 0.05)') {
        return colors.white;
      }
      return colors.dark;
    }
    return colors.dark;
  };
  
  const iconColor = getIconColor();
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <View style={styles.content}>
          {Icon && <Icon size={20} color={iconColor} />}
          <Text style={textStyle}>
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.dark,
  },
  secondary: {
    backgroundColor: colors.dark,
  },
  secondaryText: {
    color: colors.white,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.dark,
  },
  outlineText: {
    color: colors.dark,
  },
  ghost: {
    backgroundColor: colors.gray[100],
  },
  ghostText: {
    color: colors.gray[600],
  },
  success: {
    backgroundColor: colors.green[500],
  },
  successText: {
    color: colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
});
