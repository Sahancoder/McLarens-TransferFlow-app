import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { AccountScreen } from '../../features/auth/screens/AccountScreen';
import { ProfileInfoScreen, NotificationsScreen, PrivacyScreen, SupportScreen, TermsScreen } from '../../features/auth/screens/SettingsScreens';
import { CreateTransferScreen } from '../../features/transfers/screens/CreateTransfer';
import { WaitTimeDetailScreen, OnTimeRateDetailScreen } from '../../features/analytics/screens/MetricDetailScreens';
import { DispatcherTabs } from './DispatcherTabs';
import { DriverJobScreen } from '../../features/transfers/screens/DriverJob';
import { useAuth } from '../providers/AuthProvider';
import { INITIAL_TRANSFERS } from '../../shared/constants/data';

import { useTransfers } from '../../features/transfers/context/TransferContext';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user, login, logout } = useAuth();
  const { transfers, createTransfer, updateTransferStatus } = useTransfers();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login">
          {() => <LoginScreen onLogin={login} />}
        </Stack.Screen>
      ) : user.role === 'dispatcher' ? (
        <>
          <Stack.Screen name="DispatcherHome" component={DispatcherTabs} />
          <Stack.Screen name="CreateTransfer">
            {({ navigation }) => (
              <CreateTransferScreen 
                onBack={() => navigation.goBack()} 
                onCreate={(data) => {
                  createTransfer(data);
                  navigation.goBack();
                }} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Account">
            {({ navigation }) => (
              <AccountScreen 
                user={user}
                onBack={() => navigation.goBack()} 
                onNavigate={(screen) => navigation.navigate(screen as never)}
                onLogout={() => {
                  logout();
                  navigation.navigate('Login' as never);
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="ProfileInfo">
            {({ navigation }) => (
              <ProfileInfoScreen 
                user={user}
                onBack={() => navigation.goBack()} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Notifications">
            {({ navigation }) => (
              <NotificationsScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Privacy">
            {({ navigation }) => (
              <PrivacyScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Support">
            {({ navigation }) => (
              <SupportScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Terms">
            {({ navigation }) => (
              <TermsScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>
          <Stack.Screen name="WaitTimeDetail">
            {({ navigation }) => (
              <WaitTimeDetailScreen 
                transfers={transfers}
                onBack={() => navigation.goBack()} 
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="OnTimeRateDetail">
            {({ navigation }) => (
              <OnTimeRateDetailScreen 
                transfers={transfers}
                onBack={() => navigation.goBack()} 
              />
            )}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="DriverHome">
          {() => (
            <DriverJobScreen 
              transfer={transfers.find(t => t.driverId === user.id && t.status !== 'COMPLETED')}
              onUpdateStatus={updateTransferStatus}
              onLogout={logout}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
