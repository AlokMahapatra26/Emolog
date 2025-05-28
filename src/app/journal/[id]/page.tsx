import React from 'react';
import { getJournalAction } from '@/actions/journal';
import { Smile, CalendarDays, NotebookPen } from 'lucide-react';
import Delete from '@/components/Delete';

type Props = {
  params: Promise<{ id: string }>;
};

const Journal = async ({ params }: Props) => {
  const { id } = await params;
  const { journal, errorMessage } = await getJournalAction(id);

  if (!journal) {
    return (
      <div className="text-center mt-20 text-red-600">
        {errorMessage ?? 'Journal entry not found.'}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-background border border-muted rounded-2xl shadow-lg space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <NotebookPen className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Your Journal Entry</h2>
      </div>

      <div className="bg-muted/50 rounded-md p-4 max-h-[60vh] overflow-y-auto whitespace-pre-wrap leading-relaxed text-base text-muted-foreground scroll-smooth">
        {journal.entryText}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Smile className="h-4 w-4 text-yellow-500" />
          <span className="font-medium text-foreground">Mood:</span>
          <span>{journal.moodLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-foreground">Day:</span>
          <span>{journal.dayLabel}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground italic">
          {journal.createdAt ? new Date(journal.createdAt).toLocaleDateString() : 'Unknown Date'}
        </p>
      </div>

      <div>
        {journal.id && <Delete journalId={journal.id} />}
      </div>
    </div>
  );
};

export default Journal;
