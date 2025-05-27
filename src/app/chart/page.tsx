import { getAllMoodAndDayLabelAction } from '@/actions/journal'
import ChartPage from '@/components/ChartPage'
import React from 'react'



const page = async () => {
  const { data } = await getAllMoodAndDayLabelAction()

  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">🪻 Mood Tracker History 🌤️</h1>

      
        <ChartPage chartData={data}/>
     
    </div>
  )
}

export default page
