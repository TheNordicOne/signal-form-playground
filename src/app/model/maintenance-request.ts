export interface MaintenanceRequest {
  buildingNumber: string;
  roomNumber: string;
  fullName: string;
  email: string;
  category: Category | '';
  urgency: Urgency | '';
  description: string;
  phone: string;
}

export type Category = 'hvac'
  | 'electrical'
  | 'plumbing'
  | 'cleaning'
  | 'security'
  | 'other';

export type Urgency = 'low'
  | 'medium'
  | 'high'
  | 'critical'


export const initialMaintenanceRequest: MaintenanceRequest = {
  buildingNumber: '',
  roomNumber: '',
  fullName: '',
  email: '',
  category: '',
  urgency: 'low',
  description: '',
  phone: ''
}
