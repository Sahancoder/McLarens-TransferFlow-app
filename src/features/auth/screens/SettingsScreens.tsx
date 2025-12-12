import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DetailScreen } from './DetailScreen';
import { Card } from '../../../shared/components/Card';
import { colors, spacing, borderRadius } from '../../../shared/constants/theme';

export const ProfileInfoScreen = ({ onBack, user }: any) => (
  <DetailScreen title="Profile Information" onBack={onBack}>
    <Card style={styles.section}>
      <Text style={styles.label}>Full Name</Text>
      <Text style={styles.value}>{user.name}</Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.label}>Email Address</Text>
      <Text style={styles.value}>{user.email}</Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.label}>Role</Text>
      <Text style={styles.value}>{user.role === 'dispatcher' ? 'Dispatcher' : 'Driver'}</Text>
    </Card>

    {user.truck && (
      <Card style={styles.section}>
        <Text style={styles.label}>Assigned Truck</Text>
        <Text style={styles.value}>{user.truck}</Text>
      </Card>
    )}

    <Card style={styles.section}>
      <Text style={styles.label}>Employee ID</Text>
      <Text style={styles.value}>{user.id.toUpperCase()}</Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.label}>Department</Text>
      <Text style={styles.value}>Operations</Text>
    </Card>
  </DetailScreen>
);

export const NotificationsScreen = ({ onBack }: any) => (
  <DetailScreen title="Notifications" onBack={onBack}>
    <Card style={styles.section}>
      <Text style={styles.label}>Push Notifications</Text>
      <Text style={styles.description}>
        Receive real-time updates about transfer assignments, status changes, and important alerts.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.label}>Email Notifications</Text>
      <Text style={styles.description}>
        Get daily summaries and weekly reports sent to your registered email address.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.label}>Transfer Updates</Text>
      <Text style={styles.description}>
        Notifications when transfers are approved, assigned, or completed.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.label}>Congestion Alerts</Text>
      <Text style={styles.description}>
        Real-time alerts about terminal congestion and traffic delays.
      </Text>
    </Card>
  </DetailScreen>
);

export const PrivacyScreen = ({ onBack }: any) => (
  <DetailScreen title="Privacy & Security" onBack={onBack}>
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Data Protection</Text>
      <Text style={styles.description}>
        Your personal information is encrypted and stored securely. We follow industry-standard security practices to protect your data.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Location Tracking</Text>
      <Text style={styles.description}>
        Location data is only collected during active transfers and is used solely for tracking and route optimization. Your location history is automatically deleted after 30 days.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Password Security</Text>
      <Text style={styles.description}>
        We recommend changing your password every 90 days. Passwords are hashed and never stored in plain text.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
      <Text style={styles.description}>
        Enable 2FA for an additional layer of security when logging into your account.
      </Text>
    </Card>
  </DetailScreen>
);

export const SupportScreen = ({ onBack }: any) => (
  <DetailScreen title="Help & Support" onBack={onBack}>
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Support</Text>
      <Text style={styles.description}>
        📧 Email: support@mclarens.com{'\n'}
        📞 Phone: +94 11 234 5678{'\n'}
        ⏰ Hours: Mon-Fri, 8:00 AM - 6:00 PM
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>FAQs</Text>
      <Text style={styles.description}>
        • How do I create a new transfer?{'\n'}
        • How do I track my assigned transfers?{'\n'}
        • What should I do if there's a delay?{'\n'}
        • How do I update transfer status?
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Technical Support</Text>
      <Text style={styles.description}>
        For technical issues with the app, please contact our IT department at it@mclarens.com or call extension 4567.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Feedback</Text>
      <Text style={styles.description}>
        We value your feedback! Please share your suggestions and report any issues to help us improve the TransferFlow system.
      </Text>
    </Card>
  </DetailScreen>
);

export const TermsScreen = ({ onBack }: any) => (
  <DetailScreen title="Terms & Policies" onBack={onBack}>
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Terms of Service</Text>
      <Text style={styles.description}>
        By using McLarens TransferFlow, you agree to comply with all company policies and procedures. This system is for authorized personnel only.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Acceptable Use Policy</Text>
      <Text style={styles.description}>
        • Use the system only for legitimate business purposes{'\n'}
        • Do not share your login credentials{'\n'}
        • Report any security incidents immediately{'\n'}
        • Maintain confidentiality of sensitive information
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Privacy Policy</Text>
      <Text style={styles.description}>
        We collect and process personal data in accordance with GDPR and local data protection laws. Your data is used solely for operational purposes and is not shared with third parties without your consent.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Code of Conduct</Text>
      <Text style={styles.description}>
        All users must adhere to McLarens' code of conduct, including professional behavior, respect for colleagues, and compliance with safety regulations.
      </Text>
    </Card>

    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Version</Text>
      <Text style={styles.description}>
        Last updated: December 13, 2024{'\n'}
        Policy Version: 1.0
      </Text>
    </Card>
  </DetailScreen>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray[700],
  },
});
