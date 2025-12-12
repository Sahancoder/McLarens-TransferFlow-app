import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DetailScreen } from '../../auth/screens/DetailScreen';
import { Card } from '../../../shared/components/Card';
import { colors, spacing, borderRadius } from '../../../shared/constants/theme';

// Calculate Average Wait Time from transfers
export const calculateAverageWaitTime = (transfers: any[]) => {
  const completedTransfers = transfers.filter(t => t.status === 'COMPLETED' && t.createdAt && t.assignedAt);
  
  if (completedTransfers.length === 0) return { average: 0, breakdown: [] };
  
  const breakdown = completedTransfers.map(t => {
    const created = new Date(t.createdAt);
    const assigned = new Date(t.assignedAt);
    const waitMinutes = Math.floor((assigned.getTime() - created.getTime()) / 1000 / 60);
    return {
      id: t.id,
      from: t.from,
      to: t.to,
      waitMinutes,
      priority: t.priority
    };
  });
  
  const totalWait = breakdown.reduce((sum, item) => sum + item.waitMinutes, 0);
  const average = Math.floor(totalWait / breakdown.length);
  
  return { average, breakdown };
};

// Calculate On-Time Rate from transfers
export const calculateOnTimeRate = (transfers: any[]) => {
  const completedTransfers = transfers.filter(t => t.status === 'COMPLETED');
  
  if (completedTransfers.length === 0) return { rate: 0, onTime: 0, delayed: 0, breakdown: [] };
  
  const breakdown = completedTransfers.map(t => {
    const created = new Date(t.createdAt);
    const completed = new Date(t.completedAt || t.assignedAt);
    const totalMinutes = Math.floor((completed.getTime() - created.getTime()) / 1000 / 60);
    
    // Expected time based on priority
    const expectedTimes = {
      CRITICAL: 45,
      HIGH: 60,
      LOW: 90
    };
    
    const expectedTime = expectedTimes[t.priority] || 60;
    const isOnTime = totalMinutes <= expectedTime;
    
    return {
      id: t.id,
      from: t.from,
      to: t.to,
      totalMinutes,
      expectedTime,
      isOnTime,
      priority: t.priority
    };
  });
  
  const onTime = breakdown.filter(b => b.isOnTime).length;
  const delayed = breakdown.filter(b => !b.isOnTime).length;
  const rate = Math.floor((onTime / completedTransfers.length) * 100);
  
  return { rate, onTime, delayed, breakdown };
};

export const WaitTimeDetailScreen = ({ onBack, transfers }: any) => {
  const { average, breakdown } = calculateAverageWaitTime(transfers);
  
  return (
    <DetailScreen title="Average Wait Time Analysis" onBack={onBack}>
      <Card style={styles.summaryCard}>
        <Text style={styles.metricValue}>{average} min</Text>
        <Text style={styles.metricLabel}>Average Wait Time</Text>
        <Text style={styles.description}>
          Time between transfer request and driver assignment
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Calculation Method</Text>
        <Text style={styles.description}>
          Average Wait Time = (Sum of all wait times) / (Number of completed transfers){'\n\n'}
          Wait Time = Time Assigned - Time Requested
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transfers Breakdown</Text>
        <Text style={styles.tableHeader}>
          Based on {breakdown.length} completed transfers
        </Text>
        
        {breakdown.slice(0, 10).map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.transferInfo}>
              <Text style={styles.transferId}>{item.id}</Text>
              <Text style={styles.transferRoute}>{item.from} → {item.to}</Text>
            </View>
            <View style={styles.waitTimeBox}>
              <Text style={[
                styles.waitTime,
                item.waitMinutes > 60 ? styles.waitTimeBad : 
                item.waitMinutes > 30 ? styles.waitTimeWarning : 
                styles.waitTimeGood
              ]}>
                {item.waitMinutes} min
              </Text>
              <Text style={styles.priorityLabel}>{item.priority}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Insights</Text>
        <Text style={styles.description}>
          • Average wait time of {average} minutes is {average < 30 ? 'excellent' : average < 45 ? 'good' : 'needs improvement'}{'\n'}
          • Critical priority transfers should be assigned within 15 minutes{'\n'}
          • High priority within 30 minutes{'\n'}
          • Standard priority within 60 minutes
        </Text>
      </Card>
    </DetailScreen>
  );
};

export const OnTimeRateDetailScreen = ({ onBack, transfers }: any) => {
  const { rate, onTime, delayed, breakdown } = calculateOnTimeRate(transfers);
  
  return (
    <DetailScreen title="On-Time Rate Analysis" onBack={onBack}>
      <Card style={styles.summaryCard}>
        <Text style={styles.metricValue}>{rate}%</Text>
        <Text style={styles.metricLabel}>On-Time Completion Rate</Text>
        <Text style={styles.description}>
          Percentage of transfers completed within expected time
        </Text>
      </Card>

      <View style={styles.statsRow}>
        <Card style={[styles.statCard, styles.successCard]}>
          <Text style={styles.statValue}>{onTime}</Text>
          <Text style={styles.statLabel}>On Time</Text>
        </Card>
        <Card style={[styles.statCard, styles.warningCard]}>
          <Text style={styles.statValue}>{delayed}</Text>
          <Text style={styles.statLabel}>Delayed</Text>
        </Card>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Calculation Method</Text>
        <Text style={styles.description}>
          On-Time Rate = (On-Time Transfers / Total Completed) × 100{'\n\n'}
          Expected Times:{'\n'}
          • Critical Priority: 45 minutes{'\n'}
          • High Priority: 60 minutes{'\n'}
          • Standard Priority: 90 minutes
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transfers Breakdown</Text>
        <Text style={styles.tableHeader}>
          Based on {breakdown.length} completed transfers
        </Text>
        
        {breakdown.slice(0, 10).map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.transferInfo}>
              <Text style={styles.transferId}>{item.id}</Text>
              <Text style={styles.transferRoute}>{item.from} → {item.to}</Text>
            </View>
            <View style={styles.timeComparisonBox}>
              <View style={styles.timeComparison}>
                <Text style={styles.actualTime}>{item.totalMinutes} min</Text>
                <Text style={styles.expectedTime}>/ {item.expectedTime} min</Text>
              </View>
              <View style={[
                styles.statusBadge,
                item.isOnTime ? styles.statusOnTime : styles.statusDelayed
              ]}>
                <Text style={styles.statusText}>
                  {item.isOnTime ? 'ON TIME' : 'DELAYED'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Insights</Text>
        <Text style={styles.description}>
          • {rate}% on-time rate is {rate >= 95 ? 'excellent' : rate >= 85 ? 'good' : 'needs improvement'}{'\n'}
          • {onTime} transfers completed on schedule{'\n'}
          • {delayed} transfers experienced delays{'\n'}
          • Continue prioritizing critical and high-priority transfers
        </Text>
      </Card>
    </DetailScreen>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginBottom: spacing.lg,
  },
  metricValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[600],
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray[600],
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 12,
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[500],
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  transferInfo: {
    flex: 1,
  },
  transferId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 2,
  },
  transferRoute: {
    fontSize: 12,
    color: colors.gray[500],
  },
  waitTimeBox: {
    alignItems: 'flex-end',
  },
  waitTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  waitTimeGood: {
    color: colors.green[500],
  },
  waitTimeWarning: {
    color: colors.yellow[700],
  },
  waitTimeBad: {
    color: colors.red[500],
  },
  priorityLabel: {
    fontSize: 10,
    color: colors.gray[400],
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  successCard: {
    backgroundColor: colors.green[50],
    borderWidth: 1,
    borderColor: colors.green[100],
  },
  warningCard: {
    backgroundColor: colors.red[50],
    borderWidth: 1,
    borderColor: colors.red[100],
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[600],
  },
  timeComparisonBox: {
    alignItems: 'flex-end',
    gap: 4,
  },
  timeComparison: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  actualTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
  },
  expectedTime: {
    fontSize: 12,
    color: colors.gray[500],
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusOnTime: {
    backgroundColor: colors.green[100],
  },
  statusDelayed: {
    backgroundColor: colors.red[100],
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
