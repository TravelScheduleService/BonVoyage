import { Dashboard } from '@/@types/type';
import createStateContext from './createStateContext';

export const [useDashboardState, DashboardProvider] =
  createStateContext<Dashboard | null>(null);
