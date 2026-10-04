import type { CompanyRun } from './types';

export function formatDuration(createdAt: string): string {
  const start = new Date(createdAt);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / 1000);

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ${diff % 60}s`;
  return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`;
}

export function getStatusColor(status: CompanyRun['status']): string {
  switch (status) {
    case 'pending':
      return 'text-amber-400';
    case 'running':
      return 'text-blue-400';
    case 'completed':
      return 'text-emerald-400';
    case 'failed':
      return 'text-red-400';
  }
}

export function getStatusLabel(status: CompanyRun['status']): string {
  switch (status) {
    case 'pending':
      return 'Queued';
    case 'running':
      return 'Analyzing';
    case 'completed':
      return 'Complete';
    case 'failed':
      return 'Failed';
  }
}