'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function DateAndTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="max-w-sm mx-auto p-4 border rounded-2xl mb-4">
      <CardContent className="text-center space-y-2">
        
        <p className="text-lg text-primary">{formattedDate}</p>
       
        <p className="text-2xl font-bold text-primary">{formattedTime}</p>
      </CardContent>
    </Card>
  );
}
