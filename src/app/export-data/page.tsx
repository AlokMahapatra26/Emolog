"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightFromLine, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'  // optional: if you use `cn()` helper

const Page = () => {
  const [copied, setCopied] = useState(false)
  const downloadURL = "https://emolog-iota.vercel.app/"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(downloadURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center px-4 py-8 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-xl font-semibold text-red-600">
          ⚠️ Download not supported in app
        </h1>
        <p className="text-gray-700">
          Please open the link below in a browser to download your journal:
        </p>

        <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
          <p className="truncate text-blue-600 font-medium">{downloadURL}</p>
          <Button variant="secondary" size="icon" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
         <p className="text-gray-700">
          If you are using website you can download through below button
        </p>
        {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}

        <form action="/api/download-journal" method="post">
          <Button type="submit" variant="outline" className="w-full flex items-center gap-2 justify-center">
            <ArrowRightFromLine className="w-4 h-4" />
            <span>Export All Data</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Page
