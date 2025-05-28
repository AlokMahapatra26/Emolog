

import { getAllJournalAction } from '@/actions/journal'

export async function downloadJournalHTML() {
  const {journal , errorMessage} = await getAllJournalAction()
  
    if (errorMessage) {
      return (
        <div className="text-center mt-20 text-red-600">
          Failed to load journals or none found.
        </div>
      )
    }
  
  
    
  
    
  
    console.log(journal)

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>My Journal Entries</title>
      <style>
        body { font-family: sans-serif; padding: 20px; background: #f4f4f4; }
        .entry { margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .entry h2 { margin: 0 0 8px; color: #333; }
        .entry p { margin: 4px 0; color: #555; }
        .date { font-size: 0.9em; color: #999; }
      </style>
    </head>
    <body>
      <h1>My Journal Entries</h1>
      ${Array.isArray(journal) && journal.length > 0
  ? journal.map((entry: any) => `
    <div class="entry">
      
      <p class="date">${entry.createdAt}</p>
      <p>${entry.entryText}</p>
      <p>Mood Label : ${entry.moodLabel}</p>
      <p>Day Label : ${entry.dayLabel}</p>
    </div>
  `).join('')
  : `<p>No journal entries available.</p>`}

    </body>
    </html>
  `.trim()

  return new Response(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': 'attachment; filename="journal.html"',
    },
  })
}
