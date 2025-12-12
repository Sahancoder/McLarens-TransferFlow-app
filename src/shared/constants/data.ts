export const TERMINALS = [
  { id: 'T1', name: 'Terminal A (North)', code: 'NTH' },
  { id: 'T2', name: 'Terminal B (Port)', code: 'PRT' },
  { id: 'T3', name: 'Terminal C (Logistics)', code: 'LOG' },
  { id: 'T4', name: 'Terminal D (South)', code: 'STH' },
  { id: 'T5', name: 'Terminal E (East)', code: 'EST' },
];

export const PRIORITIES: any = {
  LOW: { label: 'Standard', color: 'bg-gray-200 text-gray-700' },
  HIGH: { label: 'Urgent', color: 'bg-yellow-100 text-yellow-800' },
  CRITICAL: { label: 'Critical', color: 'bg-red-100 text-red-800' },
};

export const STATUS_STEPS: any = {
  REQUESTED: { label: 'Requested', color: 'bg-gray-100 text-gray-600', step: 1 },
  APPROVED: { label: 'Approved', color: 'bg-blue-100 text-blue-700', step: 2 },
  DISPATCHED: { label: 'Dispatched', color: 'bg-yellow-100 text-yellow-800', step: 3 },
  PICKED_UP: { label: 'In Transit', color: 'bg-orange-100 text-orange-800', step: 4 },
  COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-800', step: 5 },
};

const today = new Date();
const getTimeAgo = (hours: number) => {
  const date = new Date(today);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

export const INITIAL_TRANSFERS = [
  // Active Transfers
  { id: 'TR-8821', from: 'T1', to: 'T2', containers: 2, priority: 'HIGH', status: 'DISPATCHED', driverId: 'D1', assignedAt: getTimeAgo(2), truck: 'TRK-04', requestedBy: 'admin', createdAt: getTimeAgo(3) },
  { id: 'TR-8824', from: 'T2', to: 'T1', containers: 3, priority: 'CRITICAL', status: 'APPROVED', driverId: 'D1', assignedAt: getTimeAgo(1), truck: 'TRK-04', requestedBy: 'admin', createdAt: getTimeAgo(1.5) },
  { id: 'TR-8822', from: 'T3', to: 'T1', containers: 1, priority: 'LOW', status: 'REQUESTED', driverId: null, assignedAt: null, truck: null, requestedBy: 'admin', createdAt: getTimeAgo(0.5) },
  { id: 'TR-8823', from: 'T2', to: 'T3', containers: 4, priority: 'CRITICAL', status: 'APPROVED', driverId: 'D2', assignedAt: getTimeAgo(4), truck: 'TRK-09', requestedBy: 'admin', createdAt: getTimeAgo(5) },
  { id: 'TR-8825', from: 'T4', to: 'T5', containers: 2, priority: 'HIGH', status: 'PICKED_UP', driverId: 'D3', assignedAt: getTimeAgo(6), truck: 'TRK-12', requestedBy: 'admin', createdAt: getTimeAgo(7) },
  { id: 'TR-8826', from: 'T5', to: 'T1', containers: 5, priority: 'HIGH', status: 'DISPATCHED', driverId: 'D4', assignedAt: getTimeAgo(3), truck: 'TRK-15', requestedBy: 'admin', createdAt: getTimeAgo(4) },
  { id: 'TR-8827', from: 'T1', to: 'T4', containers: 1, priority: 'LOW', status: 'REQUESTED', driverId: null, assignedAt: null, truck: null, requestedBy: 'admin', createdAt: getTimeAgo(0.2) },
  { id: 'TR-8828', from: 'T3', to: 'T5', containers: 3, priority: 'HIGH', status: 'APPROVED', driverId: 'D5', assignedAt: getTimeAgo(2), truck: 'TRK-18', requestedBy: 'admin', createdAt: getTimeAgo(3) },
  { id: 'TR-8829', from: 'T2', to: 'T4', containers: 2, priority: 'CRITICAL', status: 'PICKED_UP', driverId: 'D2', assignedAt: getTimeAgo(5), truck: 'TRK-09', requestedBy: 'admin', createdAt: getTimeAgo(6) },
  
  // Completed Transfers (Recent History)
  { id: 'TR-8820', from: 'T1', to: 'T3', containers: 1, priority: 'LOW', status: 'COMPLETED', driverId: 'D1', assignedAt: getTimeAgo(10), truck: 'TRK-04', requestedBy: 'admin', createdAt: getTimeAgo(12), completedAt: getTimeAgo(8) },
  { id: 'TR-8815', from: 'T2', to: 'T1', containers: 4, priority: 'HIGH', status: 'COMPLETED', driverId: 'D3', assignedAt: getTimeAgo(15), truck: 'TRK-12', requestedBy: 'admin', createdAt: getTimeAgo(16), completedAt: getTimeAgo(12) },
  { id: 'TR-8810', from: 'T3', to: 'T2', containers: 2, priority: 'CRITICAL', status: 'COMPLETED', driverId: 'D2', assignedAt: getTimeAgo(20), truck: 'TRK-09', requestedBy: 'admin', createdAt: getTimeAgo(22), completedAt: getTimeAgo(18) },
  { id: 'TR-8805', from: 'T4', to: 'T1', containers: 3, priority: 'HIGH', status: 'COMPLETED', driverId: 'D4', assignedAt: getTimeAgo(24), truck: 'TRK-15', requestedBy: 'admin', createdAt: getTimeAgo(26), completedAt: getTimeAgo(20) },
  { id: 'TR-8800', from: 'T5', to: 'T3', containers: 5, priority: 'LOW', status: 'COMPLETED', driverId: 'D5', assignedAt: getTimeAgo(28), truck: 'TRK-18', requestedBy: 'admin', createdAt: getTimeAgo(30), completedAt: getTimeAgo(24) },
  { id: 'TR-8795', from: 'T1', to: 'T5', containers: 1, priority: 'HIGH', status: 'COMPLETED', driverId: 'D1', assignedAt: getTimeAgo(32), truck: 'TRK-04', requestedBy: 'admin', createdAt: getTimeAgo(34), completedAt: getTimeAgo(28) },
];

export const USERS = {
  DISPATCHER: { id: 'admin', name: 'Sahan', role: 'dispatcher', email: 'sahanviranga18@gmail.com' },
  DRIVER: { id: 'D1', name: 'Sam Wilson', role: 'driver', truck: 'TRK-04', email: 'sam.wilson@mclarens.com' },
  DRIVER2: { id: 'D2', name: 'Mike Johnson', role: 'driver', truck: 'TRK-09', email: 'mike.johnson@mclarens.com' },
  DRIVER3: { id: 'D3', name: 'David Chen', role: 'driver', truck: 'TRK-12', email: 'david.chen@mclarens.com' },
  DRIVER4: { id: 'D4', name: 'James Rodriguez', role: 'driver', truck: 'TRK-15', email: 'james.rodriguez@mclarens.com' },
  DRIVER5: { id: 'D5', name: 'Robert Kumar', role: 'driver', truck: 'TRK-18', email: 'robert.kumar@mclarens.com' },
};
