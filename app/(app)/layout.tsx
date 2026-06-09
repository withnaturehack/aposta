import { requireSession } from '@/lib/session'
import Shell from '@/components/Shell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession()
  return <Shell user={session}>{children}</Shell>
}
