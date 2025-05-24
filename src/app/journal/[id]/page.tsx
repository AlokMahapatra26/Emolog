import React from 'react'
import { getJournalAction } from '@/actions/journal'

interface JournalProps {
  params: {
    id: string
  }
}

const Journal = async ({ params }: JournalProps) => {
  const { id } = await params
  const {journal , errorMessage} = await getJournalAction(id)

  return (
    <div className="p-6 text-lg">
      Journal ID: <span className="font-mono text-indigo-600">{id}</span>
      <p>{journal?.entryText}</p>
      <p>{journal?.moodLabel}</p>
      <p>{journal?.dayLabel}</p>
      <p>{journal?.userId}</p>
    
    </div>
  )
}

export default Journal
