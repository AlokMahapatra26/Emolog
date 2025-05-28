import React from "react";
import Chat from "@/components/Chat";
import { getUser } from "@/auth/server";
const AItherapist = async () => {
  const user = await getUser();

  return (
   
      <div className="bg-background rounded-2xl border p-8 max-w-md w-full text-center space-y-6 mx-auto">
        

        <h1 className="text-2xl font-semibold text-foreground">Chat with a Therapist</h1>

        <p className="text-muted-foreground text-sm">
          This is an AI-powered therapist experience designed to listen, reflect, and support.
        </p>

        <Chat user={user}  />

        

        <p className="text-xs text-muted-foreground mt-2">
  {"\u26A0\uFE0F"} This AI is not a substitute for real mental health care. If you're going through a serious situation, please seek help from a licensed therapist or professional.
</p>

      </div>
    
  );
};

export default AItherapist;
