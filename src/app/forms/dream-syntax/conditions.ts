import { MaintenanceRequest } from '../../model/maintenance-request';

export function isUrgent(request: MaintenanceRequest) {
  return request.details.urgency === 'high' || request.details.urgency === 'critical';
}
