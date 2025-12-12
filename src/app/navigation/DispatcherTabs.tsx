import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, BarChart3, LogOut } from 'lucide-react-native';
import { TouchableOpacity, Text, View } from 'react-native';
import { DispatcherDashboard } from '../../features/transfers/screens/DispatcherDashboard';
import { CreateTransferScreen } from '../../features/transfers/screens/CreateTransfer';
import { AnalyticsScreen } from '../../features/analytics/screens/Analytics';
import { useAuth } from '../providers/AuthProvider';

import { useTransfers } from '../../features/transfers/context/TransferContext';

const Tab = createBottomTabNavigator();

export const DispatcherTabs = () => {
  const { logout } = useAuth();
  const { transfers } = useTransfers();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: '#1A1813',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        children={({ navigation }) => (
          <DispatcherDashboard 
            transfers={transfers}
            onCreateClick={() => navigation.navigate('CreateTransfer' as never)}
            onTransferClick={(t) => console.log(t)}
            onAccountClick={() => navigation.navigate('Account' as never)}
          />
        )}
        options={{
          tabBarIcon: ({ color, focused }) => <LayoutDashboard size={24} color={color} strokeWidth={focused ? 2.5 : 2} />,
          tabBarLabel: ({ focused }) => <Text style={{ fontSize: 10, fontWeight: 'bold', color: focused ? '#1A1813' : '#9CA3AF' }}>Dispatch</Text>
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        children={({ navigation }) => (
          <AnalyticsScreen 
            transfers={transfers}
            onMetricClick={(metric) => {
              if (metric === 'waitTime') {
                navigation.navigate('WaitTimeDetail' as never);
              } else if (metric === 'onTimeRate') {
                navigation.navigate('OnTimeRateDetail' as never);
              }
            }}
          />
        )}
        options={{
          tabBarIcon: ({ color, focused }) => <BarChart3 size={24} color={color} strokeWidth={focused ? 2.5 : 2} />,
          tabBarLabel: ({ focused }) => <Text style={{ fontSize: 10, fontWeight: 'bold', color: focused ? '#1A1813' : '#9CA3AF' }}>Reports</Text>
        }}
      />
      <Tab.Screen 
        name="Logout" 
        component={View} // Dummy component, we override the button
        options={{
          tabBarIcon: ({ color }) => <LogOut size={24} color={color} />,
          tabBarLabel: () => <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#9CA3AF' }}>Logout</Text>,
          tabBarButton: (props) => (
            <TouchableOpacity 
              style={props.style}
              onPress={logout}
              activeOpacity={0.7}
            >
              {props.children}
            </TouchableOpacity>
          )
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            logout();
          },
        }}
      />
    </Tab.Navigator>
  );
};
