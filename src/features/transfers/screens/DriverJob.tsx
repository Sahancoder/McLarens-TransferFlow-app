import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { User, LogOut, Package, ChevronRight, Truck } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Button } from '../../../shared/components/Button';
import { PriorityBadge } from '../../../shared/components/Badge';
import { TERMINALS } from '../../../shared/constants/data';
import { colors, spacing, borderRadius, shadows } from '../../../shared/constants/theme';

interface DriverJobScreenProps {
  transfer: any;
  onUpdateStatus: (id: string, status: string) => void;
  onLogout: () => void;
}

export const DriverJobScreen = ({ transfer, onUpdateStatus, onLogout }: DriverJobScreenProps) => {
  if (!transfer) return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Truck size={40} color={colors.gray[300]} />
      </View>
      <Text style={styles.emptyTitle}>No Active Jobs</Text>
      <Text style={styles.emptySubtitle}>You are currently available. Wait for dispatch assignment.</Text>
      <Button variant="outline" onPress={onLogout} icon={LogOut} style={styles.emptyButton}>
        Sign Out
      </Button>
    </View>
  );

  const getAction = () => {
    switch (transfer.status) {
      case 'APPROVED': return { label: 'Accept Job', next: 'DISPATCHED', color: 'primary' };
      case 'DISPATCHED': return { label: 'Confirm Pickup', next: 'PICKED_UP', color: 'primary' };
      case 'PICKED_UP': return { label: 'Confirm Dropoff', next: 'COMPLETED', color: 'success' };
      default: return null;
    }
  };

  const action = getAction();
  const fromTerminal = TERMINALS.find(t => t.id === transfer.from);
  const toTerminal = TERMINALS.find(t => t.id === transfer.to);

  return (
    <View style={styles.container}>
      {/* Driver Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.driverInfo}>
             <View style={styles.avatar}>
              <User size={20} color={colors.white} />
            </View>
            <View>
              <Text style={styles.driverName}>Sam (Driver)</Text>
              <Text style={styles.driverStatus}>TRK-04 • ON DUTY</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <LogOut size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Job Card */}
      <View style={styles.jobCard}>
        {/* Map View with Route */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapBackground} />
          <Svg width="100%" height="100%" viewBox="0 0 100 100" style={styles.mapSvg}>
            {/* Route line */}
            <Path
              d="M 20 60 Q 50 30 80 60"
              stroke={colors.primary}
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />
            {/* Start marker */}
            <Circle cx="20" cy="60" r="4" fill={colors.green[500]} stroke={colors.white} strokeWidth="2" />
            {/* End marker */}
            <Circle cx="80" cy="60" r="4" fill={colors.red[500]} stroke={colors.white} strokeWidth="2" />
            {/* Truck icon (current position) */}
            <Circle cx="50" cy="35" r="5" fill={colors.dark} stroke={colors.primary} strokeWidth="2" />
          </Svg>
          <View style={styles.mapDistance}>
            <Text style={styles.mapDistanceText}>2.4 km • 12 min</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.jobContent} showsVerticalScrollIndicator={false}>
          <View style={styles.jobHeader}>
            <View style={styles.jobIdBadge}>
              <Text style={styles.jobIdText}>JOB #{transfer.id}</Text>
            </View>
            <PriorityBadge priority={transfer.priority} />
          </View>
          <Text style={styles.jobTitle}>
            {transfer.status === 'PICKED_UP' ? `Drive to ${toTerminal?.name}` : `Pick up at ${fromTerminal?.name}`}
          </Text>

          <View style={styles.timeline}>
             {/* Pickup */}
             <View style={styles.timelineItem}>
                <View style={[
                  styles.timelineDot,
                  { backgroundColor: transfer.status === 'PICKED_UP' ? colors.green[500] : colors.primary }
                ]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineLabel}>PICKUP</Text>
                  <Text style={styles.timelineLocation}>{fromTerminal?.name}</Text>
                  <Text style={styles.timelineDetails}>{fromTerminal?.code} • Gate 4</Text>
                </View>
             </View>
             {/* Dropoff */}
             <View style={styles.timelineItem}>
                <View style={[
                  styles.timelineDot,
                  { backgroundColor: transfer.status === 'PICKED_UP' ? colors.primary : colors.gray[300] }
                ]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineLabel}>DROPOFF</Text>
                  <Text style={styles.timelineLocation}>{toTerminal?.name}</Text>
                  <Text style={styles.timelineDetails}>{toTerminal?.code} • Dock B2</Text>
                </View>
             </View>
          </View>

          <View style={styles.cargoInfo}>
            <View>
               <Text style={styles.cargoLabel}>CARGO</Text>
               <Text style={styles.cargoValue}>{transfer.containers}x 40ft Containers</Text>
            </View>
            <Package size={32} color={colors.gray[300]} />
          </View>

          {/* Action Button */}
          {action && (
            <View style={styles.actionContainer}>
              <Button 
                variant={action.color as any}
                style={styles.actionButton}
                onPress={() => onUpdateStatus(transfer.id, action.next)}
                icon={ChevronRight}
              >
                {action.label}
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xxl,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    ...shadows.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.gray[500],
    marginBottom: 32,
    textAlign: 'center',
  },
  emptyButton: {
    width: 'auto',
    paddingHorizontal: 32,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    padding: spacing.xxl,
    paddingTop: 48,
    paddingBottom: spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[700],
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverName: {
    fontWeight: 'bold',
    color: colors.white,
  },
  driverStatus: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'monospace',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.full,
  },
  jobCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 240,
    width: '100%',
    backgroundColor: colors.gray[100],
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.gray[200],
    opacity: 0.5,
  },
  mapSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapDistance: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    ...shadows.sm,
  },
  mapDistanceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobContent: {
    flex: 1,
    padding: spacing.xxl,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  jobIdBadge: {
    backgroundColor: colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  jobIdText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  timeline: {
    paddingLeft: spacing.xxl,
    borderLeftWidth: 2,
    borderLeftColor: colors.gray[200],
    gap: 32,
    marginBottom: spacing.xxl,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.white,
    marginLeft: -31,
    ...shadows.sm,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 12,
    color: colors.gray[400],
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineLocation: {
    fontWeight: 'bold',
    color: colors.gray[800],
    fontSize: 16,
    marginBottom: 2,
  },
  timelineDetails: {
    fontSize: 14,
    color: colors.gray[500],
  },
  cargoInfo: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray[100],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  cargoLabel: {
    fontSize: 12,
    color: colors.gray[400],
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cargoValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionContainer: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  actionButton: {
    height: 64,
    ...shadows.lg,
  },
});
