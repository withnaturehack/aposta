import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { jobs } from '@/lib/store'
import RecruitmentClient from './RecruitmentClient'

export const metadata: Metadata = { title: 'Recruitment' }

export default async function RecruitmentPage() {
  await requireSession()
  return <RecruitmentClient jobs={jobs} />
}
