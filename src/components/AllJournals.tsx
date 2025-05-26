
import React from "react"
import { getAllJournalAction } from "@/actions/journal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import {  Smile, Text , Trash2 } from "lucide-react"
import Link from "next/link"



const moodColorMap: Record<string, string> = {
  happy: "bg-yellow-100 text-yellow-800",
  sad: "bg-blue-100 text-blue-800",
  angry: "bg-red-100 text-red-800",
  calm: "bg-green-100 text-green-800",
  anxious: "bg-purple-100 text-purple-800",
  excited: "bg-pink-100 text-pink-800",
  neutral: "bg-gray-100 text-gray-800",
}

const AllJournals = async () => {
  const {journal , errorMessage} = await getAllJournalAction()

  if (errorMessage) {
    return (
      <div className="text-center mt-20 text-red-600">
        Failed to load journals or none found.
      </div>
    )
  }


  

  

  console.log(journal)

  return (
   
    <div className="max-w-3xl mx-auto p-4">
  <h1 className="text-2xl font-semibold mb-4 text-indigo-700">Your Journal Entries</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {[...(journal ?? [])].reverse().map((journal: any) => {
    const mood = journal.moodLabel?.toLowerCase();
    const moodColor = moodColorMap[mood] || "bg-gray-100 text-gray-800";
    const date = new Date(journal.createdAt);
    const formattedDate = format(date, "dd MMM");

    return (
      <Link href={`/journal/${journal.id}`} key={journal.id}>
        <Card className="h-48 w-full border border-indigo-200 hover:shadow-md transition-shadow duration-200 rounded-xl flex flex-col justify-between">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Badge className={`text-xs ${moodColor}`}>
                <Smile className="h-3 w-3" /> {journal.moodLabel}
              </Badge>
              <div className="text-lg font-bold text-gray-700">
                {formattedDate}
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Text className="h-3 w-3" />
              {journal.dayLabel}
            </div>
            <div className="text-sm text-gray-600 line-clamp-3">
              {journal.entryText}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  })}
</div>

</div>


  )
}

export default AllJournals
