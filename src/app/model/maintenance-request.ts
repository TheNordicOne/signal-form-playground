export interface MaintenanceRequest {
  buildingNumber: string;
  roomNumber: string;
  fullName: string;
  email: string;
  details: {
    category: Category | '';
    urgency: Urgency | '';
    description: string;
  }
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
  details: {
    category: '',
    urgency: 'low',
    description: '',
  },
  phone: ''
}
