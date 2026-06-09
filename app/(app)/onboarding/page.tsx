import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { onboarding } from '@/lib/store'
import OnboardingClient from './OnboardingClient'

export const metadata: Metadata = { title: 'Onboarding' }

export default async function OnboardingPage() {
  await requireSession()
  return <OnboardingClient data={onboarding} />
}
