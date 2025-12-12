import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { User, Search, Plus, Package, ArrowRight, Box, Clock, Truck } from 'lucide-react-native';
import { Card } from '../../../shared/components/Card';
import { StatusBadge, PriorityBadge } from '../../../shared/components/Badge';
import { TERMINALS } from '../../../shared/constants/data';
import { colors, spacing, borderRadius, shadows } from '../../../shared/constants/theme';

interface DispatcherDashboardProps {
  transfers: any[];
  onCreateClick: () => void;
  onTransferClick: (t: any) => void;
  onAccountClick: () => void;
}

export const DispatcherDashboard = ({ transfers, onCreateClick, onTransferClick, onAccountClick }: DispatcherDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  const activeTransfers = transfers.filter(t => t.status !== 'COMPLETED');
  const completedTransfers = transfers.filter(t => t.status === 'COMPLETED');
  const displayedTransfers = activeTab === 'active' ? activeTransfers : completedTransfers;

  const urgentCount = activeTransfers.filter(t => t.priority === 'CRITICAL' || t.priority === 'HIGH').length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Sahan</Text>
          </View>
          <TouchableOpacity onPress={onAccountClick} style={styles.avatar} activeOpacity={0.7}>
            <Image 
              source={require('../../../../assets/pic1.png')} 
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.stat1]}>
            <Text style={styles.statLabel}>Active</Text>
            <Text style={styles.statValue}>{activeTransfers.length}</Text>
          </View>
          <View style={[styles.statCard, styles.stat2]}>
            <Text style={styles.statLabel}>Urgent</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>{urgentCount}</Text>
          </View>
          <View style={[styles.statCard, styles.stat3]}>
            <Text style={styles.statLabel}>Available</Text>
            <Text style={[styles.statValue, { color: colors.green[400] }]}>8</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Search Bar */}
        <Card style={styles.searchCard}>
          <Search size={20} color={colors.gray[400]} />
          <TextInput 
            placeholder="Search transfer ID or container..." 
            placeholderTextColor={colors.gray[400]}
            style={styles.searchInput}
          />
        </Card>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('active')}
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('completed')}
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {displayedTransfers.length === 0 ? (
            <View style={styles.emptyState}>
              <Package size={48} color={colors.gray[200]} />
              <Text style={styles.emptyText}>No transfers found</Text>
            </View>
          ) : (
            displayedTransfers.map(t => (
              <Card key={t.id} style={styles.transferCard} onPress={() => onTransferClick(t)}>
                <View style={styles.transferHeader}>
                  <View style={styles.transferId}>
                    <Text style={styles.idText}>{t.id}</Text>
                    <PriorityBadge priority={t.priority} />
                  </View>
                  <StatusBadge status={t.status} />
                </View>
                
                <View style={styles.routeContainer}>
                  <View>
                    <Text style={styles.routeLabel}>From</Text>
                    <Text style={styles.routeCode}>{TERMINALS.find(x => x.id === t.from)?.code}</Text>
                  </View>
                  <View style={styles.routeArrow}>
                    <View style={styles.routeLine} />
                    <View style={styles.routeIcon}>
                      <ArrowRight size={12} color={colors.gray[400]} />
                    </View>
                  </View>
                  <View style={styles.routeTo}>
                    <Text style={styles.routeLabel}>To</Text>
                    <Text style={styles.routeCode}>{TERMINALS.find(x => x.id === t.to)?.code}</Text>
                  </View>
                </View>

                <View style={styles.transferInfo}>
                  <View style={styles.infoItem}>
                    <Box size={14} color={colors.gray[500]} />
                    <Text style={styles.infoText}>{t.containers} Cont.</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Truck size={14} color={colors.gray[500]} />
                    <Text style={styles.infoText}>{t.truck || 'Unassigned'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Clock size={14} color={colors.gray[500]} />
                    <Text style={styles.infoText}>10:30 AM</Text>
                  </View>
                </View>
              </Card>
            ))
          )}
        </ScrollView>
      </View>

      <TouchableOpacity 
        onPress={onCreateClick}
        style={styles.fab}
        activeOpacity={0.8}
      >
        <Plus size={28} color={colors.dark} />
      </TouchableOpacity>
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
    paddingTop: 48,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xxl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    ...shadows.lg,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xxl,
  },
  welcomeText: {
    color: colors.gray[400],
    fontSize: 14,
    fontWeight: '500',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[700],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.gray[600],
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stat1: {},
  stat2: {},
  stat3: {},
  statLabel: {
    fontSize: 12,
    color: colors.gray[400],
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    marginTop: -16,
  },
  searchCard: {
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[800],
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  tab: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray[400],
  },
  activeTabText: {
    color: colors.dark,
  },
  list: {
    flex: 1,
    marginBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    color: colors.gray[400],
  },
  transferCard: {
    marginBottom: 12,
  },
  transferHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  transferId: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  idText: {
    fontWeight: 'bold',
    color: colors.dark,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  routeLabel: {
    fontSize: 10,
    color: colors.gray[400],
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  routeCode: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  routeArrow: {
    flex: 1,
    height: 2,
    backgroundColor: colors.gray[100],
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: colors.gray[100],
  },
  routeIcon: {
    width: 20,
    height: 20,
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  routeTo: {
    alignItems: 'flex-end',
  },
  transferInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray[50],
    padding: 8,
    borderRadius: borderRadius.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.gray[500],
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    ...shadows.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
