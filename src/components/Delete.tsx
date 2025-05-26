"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteJournalAction } from '@/actions/journal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface DeleteProps {
  journalId: string
}

const Delete = ({journalId} : DeleteProps) => {

  const [loading , setloading] = useState(false)
  const router = useRouter()
  
  
  async function handleDelete(){
    setloading(true)

        

        const { errorMessage } = await deleteJournalAction(journalId);

        if(!errorMessage){
            toast.success("Deleted successfully")
            router.push("/")
        }else{
            toast.error("Error while deleting ", {
                description : errorMessage
            })
        }

        setloading(false)
        console.log("Logging out..")
    

    
  }

  return (
    
    <Button   className="cursor-pointer" disabled={loading} variant="destructive" onClick={handleDelete}>
        {loading ? <Loader2 className='animate-spin'/> : <Trash2 className=''/>}
    </Button>
   
  )
}

export default Delete