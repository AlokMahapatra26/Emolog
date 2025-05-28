import { downloadJournalHTML } from '@/lib/downloadData'

export async function POST() {
  return await downloadJournalHTML()
}
