import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export const Card = ({ children, style, onPress }: CardProps) => {
  const Container = onPress ? Pressable : View;
  
  return (
    <Container 
      onPress={onPress}
      style={[styles.card, style]}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
});
