import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { documents } from '@/lib/store'
import DocumentsClient from './DocumentsClient'

export const metadata: Metadata = { title: 'Documents' }

export default async function DocsPage() {
  await requireSession()
  return <DocumentsClient documents={documents} />
}
