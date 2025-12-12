import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, CheckCircle2, BarChart3, AlertCircle } from 'lucide-react-native';
import { Card } from '../../../shared/components/Card';
import { colors, spacing, borderRadius } from '../../../shared/constants/theme';
import { calculateAverageWaitTime, calculateOnTimeRate } from './MetricDetailScreens';

interface AnalyticsScreenProps {
  transfers: any[];
  onMetricClick: (metric: string) => void;
}

export const AnalyticsScreen = ({ transfers, onMetricClick }: AnalyticsScreenProps) => {
  const { average: avgWaitTime } = calculateAverageWaitTime(transfers);
  const { rate: onTimeRate } = calculateOnTimeRate(transfers);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Performance</Text>

      <View style={styles.metricsRow}>
        <TouchableOpacity 
          style={styles.metricCardWrapper}
          onPress={() => onMetricClick('waitTime')}
          activeOpacity={0.7}
        >
          <Card style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: colors.blue[50] }]}>
              <Clock size={24} color={colors.blue[600]} />
            </View>
            <Text style={styles.metricValue}>{avgWaitTime}m</Text>
            <Text style={styles.metricLabel}>Avg Wait Time</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.metricCardWrapper}
          onPress={() => onMetricClick('onTimeRate')}
          activeOpacity={0.7}
        >
          <Card style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: colors.green[50] }]}>
              <CheckCircle2 size={24} color={colors.green[500]} />
            </View>
            <Text style={styles.metricValue}>{onTimeRate}%</Text>
            <Text style={styles.metricLabel}>On-Time Rate</Text>
          </Card>
        </TouchableOpacity>
      </View>

      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <BarChart3 size={18} color={colors.dark} />
          <Text style={styles.chartTitle}>Daily Volume</Text>
        </View>
        <View style={styles.chart}>
          {[40, 65, 34, 85, 56, 24, 60].map((h, i) => (
            <View key={i} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar,
                    { 
                      height: `${h}%`,
                      backgroundColor: i === 3 ? colors.primary : colors.gray[200]
                    }
                  ]} 
                />
              </View>
              <Text style={styles.barLabel}>{['M','T','W','T','F','S','S'][i]}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.alertsCard}>
        <Text style={styles.alertsTitle}>Congestion Alerts</Text>
        <View style={styles.alertsList}>
           <View style={[styles.alert, styles.alertCritical]}>
              <AlertCircle size={20} color={colors.red[500]} />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Terminal B (Port) Gate 2</Text>
                <Text style={styles.alertDescription}>High congestion detected (+15m wait)</Text>
              </View>
           </View>
           <View style={[styles.alert, styles.alertWarning]}>
              <AlertCircle size={20} color={colors.yellow[600]} />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Truck TRK-09 Delayed</Text>
                <Text style={styles.alertDescription}>Maintenance issue reported</Text>
              </View>
           </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.xxl,
    paddingTop: 56,
    paddingBottom: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.xxl,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  metricCardWrapper: {
    flex: 1,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  metricValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.dark,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },
  chartCard: {
    marginBottom: spacing.xxl,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chartTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 128,
    gap: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  barWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    color: colors.gray[400],
    textAlign: 'center',
  },
  alertsCard: {},
  alertsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  alertsList: {
    gap: 12,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  alertCritical: {
    backgroundColor: colors.red[50],
    borderColor: colors.red[100],
  },
  alertWarning: {
    backgroundColor: colors.yellow[50],
    borderColor: colors.yellow[100],
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.gray[900],
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    color: colors.gray[700],
  },
});
