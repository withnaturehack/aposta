// Notification stub - in production writes to Supabase notifications table

export async function createNotification({
  companyId,
  userId,
  title,
  body,
  type,
  entityType,
  entityId,
}: {
  companyId: string
  userId: string
  title: string
  body: string
  type: string
  entityType?: string
  entityId?: string
}) {
  console.log('[NOTIFY]', { userId, title, body, type, timestamp: new Date().toISOString() })
}
