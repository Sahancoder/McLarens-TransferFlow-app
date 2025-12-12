import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { TERMINALS, PRIORITIES } from '../../../shared/constants/data';
import { colors, spacing, borderRadius } from '../../../shared/constants/theme';

interface CreateTransferScreenProps {
  onBack: () => void;
  onCreate: (data: any) => void;
}

export const CreateTransferScreen = ({ onBack, onCreate }: CreateTransferScreenProps) => {
  const [form, setForm] = useState({ from: 'T1', to: 'T2', containers: 1, priority: 'LOW' });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowRight size={24} color={colors.gray[600]} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transfer Request</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Route Selection */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>ROUTE</Text>
          <View style={styles.routeContainer}>
            <View style={styles.routeIndicators}>
              <View style={[styles.routeDot, { backgroundColor: colors.green[500] }]} />
              <View style={styles.routeDashedLine} />
              <View style={[styles.routeDot, { backgroundColor: colors.red[500] }]} />
            </View>
            <View style={styles.routeSelections}>
              <View style={styles.terminalGroup}>
                <Text style={styles.terminalLabel}>From</Text>
                <View style={styles.terminalButtons}>
                  {TERMINALS.map(t => (
                    <TouchableOpacity 
                      key={t.id}
                      onPress={() => setForm({...form, from: t.id})}
                      style={[
                        styles.terminalButton,
                        form.from === t.id && styles.terminalButtonActive
                      ]}
                    >
                      <Text style={[
                        styles.terminalButtonText,
                        form.from === t.id && styles.terminalButtonTextActive
                      ]}>{t.code}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.terminalGroup}>
                <Text style={styles.terminalLabel}>To</Text>
                <View style={styles.terminalButtons}>
                  {TERMINALS.map(t => (
                    <TouchableOpacity 
                      key={t.id}
                      onPress={() => setForm({...form, to: t.id})}
                      style={[
                        styles.terminalButton,
                        form.to === t.id && styles.terminalButtonActiveTo
                      ]}
                    >
                      <Text style={[
                        styles.terminalButtonText,
                        form.to === t.id && styles.terminalButtonTextActiveTo
                      ]}>{t.code}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Card>

        {/* Details */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>CARGO DETAILS</Text>
          <View style={styles.detailsContent}>
            <View style={styles.containerCounter}>
              <Text style={styles.detailLabel}>Container Count</Text>
              <View style={styles.counterRow}>
                <TouchableOpacity 
                  onPress={() => setForm(f => ({...f, containers: Math.max(1, f.containers - 1)}))}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{form.containers}</Text>
                <TouchableOpacity 
                  onPress={() => setForm(f => ({...f, containers: f.containers + 1}))}
                  style={[styles.counterButton, styles.counterButtonPlus]}
                >
                  <Text style={[styles.counterButtonText, styles.counterButtonTextPlus]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.prioritySection}>
              <Text style={styles.detailLabel}>Priority Level</Text>
              <View style={styles.priorityButtons}>
                {Object.keys(PRIORITIES).map((pKey) => (
                  <TouchableOpacity
                    key={pKey}
                    onPress={() => setForm({...form, priority: pKey})}
                    style={[
                      styles.priorityButton,
                      form.priority === pKey && styles.priorityButtonActive
                    ]}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      form.priority === pKey && styles.priorityButtonTextActive
                    ]}>
                      {PRIORITIES[pKey].label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={() => onCreate(form)}>Confirm Booking</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[50],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[500],
    marginBottom: spacing.lg,
    letterSpacing: 1,
  },
  routeContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  routeIndicators: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.full,
  },
  routeDashedLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.gray[200],
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  routeSelections: {
    flex: 1,
    gap: spacing.lg,
  },
  terminalGroup: {
    gap: spacing.sm,
  },
  terminalLabel: {
    fontSize: 12,
    color: colors.gray[400],
    fontWeight: '500',
    marginLeft: 4,
  },
  terminalButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  terminalButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.gray[100],
    backgroundColor: colors.gray[50],
  },
  terminalButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  terminalButtonActiveTo: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  terminalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.gray[600],
  },
  terminalButtonTextActive: {
    color: colors.dark,
  },
  terminalButtonTextActiveTo: {
    color: colors.white,
  },
  detailsContent: {
    gap: spacing.xxl,
  },
  containerCounter: {
    gap: spacing.sm,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonPlus: {
    backgroundColor: colors.dark,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  counterButtonTextPlus: {
    color: colors.white,
  },
  counterValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  prioritySection: {
    gap: spacing.sm,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.gray[100],
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  priorityButtonActive: {
    borderColor: colors.dark,
    backgroundColor: colors.dark,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray[500],
  },
  priorityButtonTextActive: {
    color: colors.white,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
});
