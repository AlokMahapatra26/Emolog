'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";





// Chart component
const ChartPage = ({chartData}) => {

const moodData = chartData;


// Maps to convert labels to numbers
const moodMap: Record<string, number> = {
  excited: 230,
  loved: 220,
  grateful: 210,
  happy: 200,
  hopeful: 190,
  calm: 180,
  content: 170,
  curious: 160,
  relaxed: 150,
  motivated: 140,
  nostalgic: 130,
  playful: 120,
  jealous: 110,
  confused: 100,
  lonely: 90,
  sad: 80,
  tired: 70,
  angry: 60,
  frustrated: 50,
  anxious: 40,
  overwhelmed: 30,
  embarrassed: 20,
  bored: 10
};

const dayMap: Record<string, number> = {
  'Great': 60,
  'Good': 50,
  'Okay': 40,
  'Not so good': 30,
  'Bad' : 20,
  'Tough' : 10
};

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Initialize base data for 7 days
const baseChartData = Array(7).fill(null).map((_, i) => ({
  name: daysOfWeek[i],
  mood: 0,
  day: 0,
  count: 0,
}));

// Process moodData
interface MoodEntry {
  moodLabel: string;
  dayLabel: string;
  createdAt: string | Date;
}

interface ChartDataItem {
  name: string;
  mood: number;
  day: number;
  count: number;
}

(moodData as MoodEntry[]).forEach((entry: MoodEntry) => {
  const dayIndex: number = new Date(entry.createdAt).getDay();
  const moodScore: number = moodMap[entry.moodLabel] ?? 0;
  const dayScore: number = dayMap[entry.dayLabel] ?? 0;

  (baseChartData as ChartDataItem[])[dayIndex].mood += moodScore;
  (baseChartData as ChartDataItem[])[dayIndex].day += dayScore;
  (baseChartData as ChartDataItem[])[dayIndex].count += 1;
});

// Calculate averages
const cData = baseChartData.map(item => ({
  name: item.name,
  mood: item.count ? item.mood / item.count : 0,
  day: item.count ? item.day / item.count : 0,
}));


  return (
   <div className="w-full px-4 py-6 flex flex-col items-center overflow-x-hidden">
      {/* Graphs Section */}
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-8">
        {/* Mood Level Chart */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-center lg:text-left text-lg">
              Mood Level per Day
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 230]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#8884d8"
                  name="Mood Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Day Quality Chart */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-center lg:text-left text-lg">
              Day Quality per Day
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 60]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="day"
                  stroke="#82ca9d"
                  name="Day Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Mood Logs Scrollable Section */}
      <div className="w-full max-w-[700px] mt-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">Mood Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full pr-4">
              <div className="space-y-4">
                {moodData.map((data, index) => (
                  <div
                    key={index}
                    className="bg-muted p-4 rounded-lg border"
                  >
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(data.createdAt).toLocaleString()}
                    </p>
                    <p className="text-base font-medium text-blue-600">
                      Mood: <span className="text-foreground font-normal">{data.moodLabel}</span>
                    </p>
                    <p className="text-base font-medium text-green-600">
                      Day: <span className="text-foreground font-normal">{data.dayLabel}</span>
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>



  );
};

export default ChartPage;
