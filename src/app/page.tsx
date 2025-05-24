

import React from 'react';
import { Smile, PencilLine, BookHeart } from 'lucide-react';

import Link from 'next/link';
import { getUser } from '@/auth/server';
import Dashboard from '@/components/Dashboard';
import Greet from '@/components/Greet';

export default  async function HomePage() {

  const user = await getUser();

return (
  <>
  <div className='text-center'>
    <Greet/>
  </div>
  
   {
      user ? <Dashboard /> : (
        <div>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold text-zinc-800 dark:text-white">
              Welcome to <span className="text-indigo-600 dark:text-indigo-400">EMOLOG</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Your cozy space to check in with yourself. Reflect, express, and grow — one entry at a time.
            </p>

            {/* Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-zinc-800 space-y-2">
                <Smile className="h-8 w-8 text-amber-500" />
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Track Your Mood</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">Log how you feel each day to find patterns and clarity.</p>
              </div>

              <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-zinc-800 space-y-2">
                <BookHeart className="h-8 w-8 text-pink-500" />
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Personal Journal</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">Write freely. Your words, your safe space.</p>
              </div>

              <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-zinc-800 space-y-2">
                <PencilLine className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">Daily Reflections</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">Reflect on your experiences and learn from them.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10">
              <Link
                href="/login"
                className="cursor-pointer inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition-all"
              >
                Start Journaling
                <PencilLine className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )
   }

   <hr className='mt-8'/>
  </>
)


  
    
      
  
}
