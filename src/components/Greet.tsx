import React from 'react'
import { getUser } from '@/auth/server'

const getGreeting = () => {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 20) return 'Good evening'
  return 'Good night'
}

const Greet = async () => {
  const user = await getUser()
  const greeting = getGreeting()

  return (
    <div className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
      {user ? (
        <>
          <span className="text-indigo-600 dark:text-indigo-400">{greeting},</span>{' '}
          <span className="underline decoration-indigo-500/50">{user.user_metadata.displayName}</span>
          <span className="ml-1">👋</span>
        </>
      ) : (
        `${greeting}!`
      )}
    </div>
  )
}

export default Greet

