'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import DateAndTime from '@/components/DateAndTime';
import { addJournalAction } from '@/actions/journal';

export default function Journal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const thoughts = formData.get('thoughts') as string;
      const mood = formData.get('mood') as string;
      const day = formData.get('day') as string;

      
      let errorMessage;
      let title;
      let description;

      // You can call your DB action here
      // const response = await addJournalEntry(thoughts, mood, day);
      const isSuccess = true; // fake response for now

      errorMessage = (await addJournalAction(thoughts, mood, day)).errorMessage;
      title = "Journal added successfully";
      description = "We have successfully add your todays journal in our secure database , now our AI will help you to navigate through your emotion"

      if(!errorMessage){
                toast.success(title , {description : description})
                router.replace("/")
            }else{
                toast.error("Error" , {description : errorMessage})
            }
    });
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <DateAndTime />

      <div className="w-full flex justify-center">
        <form action={handleSubmit}>
          <CardContent className="grid w-full items-center gap-4 max-w-xl">

            <p className="p-2 text-muted-foreground">
              Share your thoughts, feelings, or what’s on your mind today. Write freely — no judgments.
            </p>

            <Textarea
              name="thoughts"
              placeholder="Type here..."
              disabled={isPending}
              required
            />

            {/* Mood */}
            <div className="flex flex-col space-y-1.5">
              <p className="p-2">How was your mood today?</p>
              <Select name="mood" required>
                <SelectTrigger className="w-[280px]" disabled={isPending}>
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'happy', 'sad', 'anxious', 'calm', 'excited', 'angry', 'lonely',
                    'grateful', 'hopeful', 'tired', 'confused', 'content', 'frustrated',
                    'motivated', 'nostalgic', 'overwhelmed', 'playful', 'relaxed',
                    'bored', 'curious', 'jealous', 'loved', 'embarrassed'
                  ].map((mood) => (
                    <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Day Rating */}
            <div className="flex flex-col space-y-1.5">
              <p className="p-2">How was your day?</p>
              <Select name="day" required>
                <SelectTrigger className="w-[280px]" disabled={isPending}>
                  <SelectValue placeholder="How was your day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Great">😊 Great</SelectItem>
                  <SelectItem value="Good">🙂 Good</SelectItem>
                  <SelectItem value="Okay">😐 Okay</SelectItem>
                  <SelectItem value="Not so good">😟 Not so good</SelectItem>
                  <SelectItem value="Bad">😞 Bad</SelectItem>
                  <SelectItem value="Tought">😔 Tough</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Button variant="outline" className="cursor-pointer" disabled={isPending}>
                {isPending ? 'Saving...' : 'Add'}
              </Button>
            </div>
          </CardContent>
        </form>
      </div>
    </div>
  );
}
