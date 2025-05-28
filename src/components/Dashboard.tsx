import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Pencil , MessageCircle} from 'lucide-react'
import AllJournals from '@/components/AllJournals'

const Dashboard = () => {
  return (
    <div className='text-center mt-8'>
        
            <Link href="/journal-form">
                <Button className=" mr-4 cursor-pointer text-lg px-6 py-6 transition-transform duration-300 hover:scale-102 hover:rotate-1 text-xl w-full sm:w-auto">
        Write Journal<Pencil className="ml-2" />
      </Button>
            </Link>

            <Link href="/aitherapist">
                <Button className=" mt-4 cursor-pointer text-lg px-6 py-6 transition-transform duration-300 hover:scale-102 hover:rotate-1 text-xl w-full sm:w-auto" variant='secondary'>
        Talk to Ai Therapist <MessageCircle className="ml-2" />
      </Button> </Link>
            <hr className='mt-4'/>
            <AllJournals/>
        
        
    </div>

  )
}

export default Dashboard