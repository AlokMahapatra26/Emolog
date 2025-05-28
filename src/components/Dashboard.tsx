import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import AllJournals from '@/components/AllJournals'

const Dashboard = () => {
  return (
    <div className='text-center mt-8'>
        
            <Link href="/journal-form">
           <Button className="cursor-pointer text-lg px-6 py-3 transition-transform duration-300 hover:scale-110 hover:rotate-3">
  Write <Pencil className="ml-2" />
</Button>

            </Link>
            <hr className='mt-4'/>
            <AllJournals/>
        
        
    </div>

  )
}

export default Dashboard