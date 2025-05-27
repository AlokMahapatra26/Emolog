import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import AllJournals from '@/components/AllJournals'

const Dashboard = () => {
  return (
    <div className='text-center mt-8'>
        
            <Link href="/journal-form">
            <Button className='cursor-pointer'>Write<Pencil/></Button>
            </Link>
            <hr className='mt-4'/>
            <AllJournals/>
        
        
    </div>

  )
}

export default Dashboard