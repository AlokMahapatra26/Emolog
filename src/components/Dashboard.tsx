import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className='text-center mt-8'>
        
            <Link href="/journal">
            <Button className='cursor-pointer'>Write<Pencil/></Button>
            </Link>
        
        
    </div>

  )
}

export default Dashboard