// Audit log stub - logs to console in demo mode
// In production: write to Supabase audit_logs table

export async function audit({
  companyId,
  userId,
  action,
  entityType,
  entityId,
  before,
  after,
  ipAddress,
}: {
  companyId: string
  userId: string
  action: string
  entityType: string
  entityId?: string
  before?: unknown
  after?: unknown
  ipAddress?: string
}) {
  console.log('[AUDIT]', { companyId, userId, action, entityType, entityId, timestamp: new Date().toISOString() })
}
