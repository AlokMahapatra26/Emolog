import React from "react";
import Chat from "@/components/Chat";
import { getUser } from "@/auth/server";
import Image from "next/image";

const AItherapist = async () => {
  const user = await getUser();

  return (
   
      <div className="bg-background rounded-2xl border p-8 max-w-md w-full text-center space-y-6 mx-auto">
        

        <h1 className="text-2xl font-semibold text-foreground">Chat with a Therapist</h1>

        <p className="text-muted-foreground text-sm">
          This is an AI-powered therapist experience designed to listen, reflect, and support.
        </p>

      <div className="flex flex-wrap gap-6 p-4 justify-center">
  {["tara", "emma", "raghu", "alex"].map((name) => (
    <div key={name} className="flex flex-col items-center space-y-2">
      <div className="w-16 h-16 relative">
        <Image
          src={`/${name}.png`}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span className="text-sm capitalize text-gray-700">{name}</span>
    </div>
  ))}
</div>



        <p className=" text-sm border  p-2 rounded">
         Therapists havee access to all your journals, so you could say she knows you pretty well. Chat with Tara and relax your mind
        </p>

        <p className=" text-md border  p-2 rounded text-red-500">
         Info : Hinglish therapist are not that good yet try emma and alex 
        </p>

        <Chat user={user}  />

        

        <p className="text-xs text-muted-foreground mt-2">
   This AI is not a substitute for real mental health care. If you are going through a serious situation, please seek help from a licensed therapist or professional.
</p>

      </div>
    
  );
};

export default AItherapist;
