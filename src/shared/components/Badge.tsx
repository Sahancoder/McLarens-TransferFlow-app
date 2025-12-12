import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STATUS_STEPS, PRIORITIES } from '../constants/data';
import { colors, borderRadius, spacing } from '../constants/theme';

export const StatusBadge = ({ status }: { status: string }) => {
  const config = STATUS_STEPS[status] || STATUS_STEPS.REQUESTED;
  
  const getBadgeStyle = () => {
    switch (status) {
      case 'REQUESTED':
        return { bg: colors.gray[100], text: colors.gray[600] };
      case 'APPROVED':
        return { bg: colors.blue[100], text: colors.blue[700] };
      case 'DISPATCHED':
        return { bg: colors.yellow[100], text: colors.yellow[800] };
      case 'PICKED_UP':
        return { bg: colors.orange[100], text: colors.orange[800] };
      case 'COMPLETED':
        return { bg: colors.green[50], text: colors.green[500] };
      default:
        return { bg: colors.gray[100], text: colors.gray[600] };
    }
  };
  
  const badgeColors = getBadgeStyle();
  
  return (
    <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
      <Text style={[styles.badgeText, { color: badgeColors.text }]}>
        {config.label}
      </Text>
    </View>
  );
};

export const PriorityBadge = ({ priority }: { priority: string }) => {
  const config = PRIORITIES[priority] || PRIORITIES.LOW;
  
  const getBadgeStyle = () => {
    switch (priority) {
      case 'LOW':
        return { bg: colors.gray[200], text: colors.gray[700] };
      case 'HIGH':
        return { bg: colors.yellow[100], text: colors.yellow[800] };
      case 'CRITICAL':
        return { bg: colors.red[100], text: colors.red[700] };
      default:
        return { bg: colors.gray[200], text: colors.gray[700] };
    }
  };
  
  const badgeColors = getBadgeStyle();
  
  return (
    <View style={[styles.priorityBadge, { backgroundColor: badgeColors.bg }]}>
      <Text style={[styles.priorityText, { color: badgeColors.text }]}>
        {config.label.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
