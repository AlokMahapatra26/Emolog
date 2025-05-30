import React from 'react';
import { Smile, PencilLine, BookHeart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { getUser } from '@/auth/server';
import Dashboard from '@/components/Dashboard';
import Greet from '@/components/Greet';

export default async function HomePage() {
  const user = await getUser();

  return (
    <>
      <div className="text-center">
        <Greet />
      </div>

      {user ? (
        <Dashboard />
      ) : (
        <div className="px-4">
          <div className="max-w-4xl mx-auto text-center space-y-10 mt-10">
            <h1 className="text-5xl font-bold text-zinc-800 dark:text-white">
              Welcome to <span className="text-green-500">EMOLOG</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Your cozy space to reflect, express, and grow — one entry at a time.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="p-6 rounded-2xl shadow-lg bg-black bg-opacity-80 border border-green-400 space-y-3">
                <Smile className="h-8 w-8 text-green-400 drop-shadow-glow" />
                <h3 className="text-lg font-semibold text-white">Track Your Mood</h3>
                <p className="text-zinc-300 text-sm">Log how you feel each day to find emotional patterns.</p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg bg-black bg-opacity-80 border border-green-400 space-y-3">
                <BookHeart className="h-8 w-8 text-green-400 drop-shadow-glow" />
                <h3 className="text-lg font-semibold text-white">Personal Journal</h3>
                <p className="text-zinc-300 text-sm">Write freely in your own safe and private space.</p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg bg-black bg-opacity-80 border border-green-400 space-y-3">
                <PencilLine className="h-8 w-8 text-green-400 drop-shadow-glow" />
                <h3 className="text-lg font-semibold text-white">Daily Reflections</h3>
                <p className="text-zinc-300 text-sm">Reflect on your experiences and personal growth.</p>
              </div>

              <div className="p-6 rounded-2xl shadow-lg bg-black bg-opacity-80 border border-green-400 space-y-3">
                <BrainCircuit className="h-8 w-8 text-green-400 drop-shadow-glow" />
                <h3 className="text-lg font-semibold text-white">AI Therapist</h3>
                <p className="text-zinc-300 text-sm">
                  Navigate your emotions with the help of an intelligent, compassionate AI.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link
                href="/login"
                className="cursor-pointer inline-flex items-center px-6 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all border border-green-300 "
              >
                Start Journaling
                <PencilLine className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
