import { getAllMoodAndDayLabelAction } from '@/actions/journal'
import ChartPage from '@/components/ChartPage'
import React from 'react'



const page = async () => {
  const { data, errorMessage } = await getAllMoodAndDayLabelAction('4ef0a702-cde9-4f5a-a1c2-add1705edb72')

  console.log(data)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">🪻 Mood Tracker History 🌤️</h1>

      
        <ChartPage chartData={data}/>
     
    </div>
  )
}

export default page
