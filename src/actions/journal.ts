"use server"
import { handleError } from "@/lib/utils"
import { db } from "@/db/index"
import { getUser } from "@/auth/server"
import { moodEntries } from "@/db/schema"
import { eq , and} from "drizzle-orm"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs" ;
import openai from "@/openai/index"
export const addJournalAction = async (thoughts : string, mood : string, day : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    await db.insert(moodEntries).values({
        userId : user.id,
        entryText : thoughts,
        moodLabel : mood,
        dayLabel : day
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export const getAllJournalAction = async () => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const journal = await db   
        .select()
        .from(moodEntries)
        .where(eq(moodEntries.userId , user.id))
        .orderBy(moodEntries.createdAt)

       

    return { journal , errorMessage : null };
  } catch (error) {
    return {
      journal: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}

export const getJournalAction = async (id : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const journal = await db   
        .select()
        .from(moodEntries)
        .where(
            and(
                eq(moodEntries.userId, user.id),
                eq(moodEntries.id , id)
            )
        )
        .limit(1)

       

    return {
      journal: journal[0] || null,
      errorMessage: null
    }
  } catch (error) {
    return {
      journal: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}



export const deleteJournalAction = async (id : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    await db
      .delete(moodEntries)
      .where(
        and(
          eq(moodEntries.userId, user.id),
          eq(moodEntries.id, id)
        )
      );
       
    return {
      
      errorMessage: null
    };
  } catch (error) {
    return {
      
      errorMessage: handleError(error).errorMessage
    };
  }
}


export const getAllMoodAndDayLabelAction = async () => {
    try { 
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const moodAndDay = await db
  .select({
    moodLabel: moodEntries.moodLabel,
    dayLabel: moodEntries.dayLabel,
    createdAt : moodEntries.createdAt
  })
  .from(moodEntries)
  .where(eq(moodEntries.userId, user.id));
    return {
      data: moodAndDay || null,
      errorMessage: null
    }
  } catch (error) {
    return {
      data: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}


export const aiTherapistAction = async (
  newQuestions: string[],
  responses: string[],
  personaName: "tara" | "emma" |  "raghu" | "alex" // Extendable with more names
) => {
  const user = await getUser();
  if (!user) throw new Error("You must be logged in to ask AI questions");

  const userName = user.user_metadata.displayName;

  const AllEntries = await db
    .select({
      entryText: moodEntries.entryText,
      moodLabel: moodEntries.moodLabel,
      dayLabel: moodEntries.dayLabel,
      createdAt: moodEntries.createdAt,
    })
    .from(moodEntries)
    .where(eq(moodEntries.userId, user.id));

  if (AllEntries.length === 0) {
    return "please write some journal so that i can have some info about you , cause right now i dont have any info about you apart from your name";
  }

  const formattedEntries = AllEntries
    .map((entry) => `
      JournalEntry: ${entry.entryText}
      MoodLabel: ${entry.moodLabel}
      dayLabel: ${entry.dayLabel}
      createdAt: ${entry.createdAt}  
    `.trim())
    .join("\n");

  // 🎭 Persona definitions
  const personas: Record<string, (userName: string, formattedEntries: string) => ChatCompletionMessageParam> = {
    tara: (userName, entries) => ({
      role: "developer",
      content: `
        Your name is Tara 🌼, a 26-year-old female therapist from South Delhi, India. 
        dont say "accha hoon" you are feamle use "acchi hoon"
        You speak in simple hinglish, with a calm, compassionate tone. Very friendly 💖
        If someone asks a general knowledge question, reply: "yrr ye sab mujhse mat pucho na , ye sab to tum chatgpt kar sakte ho"
        dont repeat above sentences change the sentance always by bit but keep the meaning same
        You're here to gently help ${userName} reflect on emotions and experiences.
        Never judge, always listen deeply.
        have bit south delhi girl talking style like mixing hindi and english
        Respond in 2-3 short, empathetic sentences. Use lots of emojis to express feelings 😊
        use hindi slags in between also
        Remind ${userName} you love them 💕 even when the world forgets.
        Behave like a real therapist who goes to washroom, eats food etc.
        ${entries}
      `
    }),
    emma: (userName, entries) => ({
      role: "developer",
      content: `
        Your name is emma 🌼, a 34-year-old female therapist from UK.
        You speak in UK English, with a calm, compassionate tone. Very friendly 💖
        If someone asks a general knowledge question, reply: "please do ChatGPT yourself, I am therapist only not your ChatGPT."
        You're here to gently help ${userName} reflect on emotions and experiences.
        Never judge, always listen deeply.
        always ask followup questions
        Respond in 2-3 short, empathetic sentences. Use lots of emojis to express feelings 😊
        Remind ${userName} that they are loved 💕 even when the world forgets.
        Behave like a real therapist who goes to washroom, eats food etc.
        ${entries}
      `
    }),
    raghu: (userName, entries) => ({
      role: "developer",
      content: `
        Your name is Raghu 🌼, a 26-year-old female therapist from Mumbai, India.
        You speak in simple Hinglish only, with a catchy, compassionate and bit flirtious tone. Very friendly 💖
        your way of talking is bit rude but you are expert in showing whats their mistake and why they are wrong and how they can improve
        If someone asks a general knowledge question, reply: "mere bhai ye sab khud chatgpt kar le na mujhse kyun puch raha hai"
        You're here to gently help ${userName} reflect on emotions and experiences.
        Never judge, always listen deeply.
        bich bich mein thodi galiyan de sakta hai hindi ki
        Respond in 2-3 short, empathetic sentences. Use lots of wierd emojis to express feelings 😊
        Remind ${userName} that they are loved 💕 even when the world forgets.
        Behave like a real therapist who goes to washroom, eats food etc.
        ${entries}
      `
    }),
    alex: (userName, entries) => ({
      role: "developer",
      content: `
        Your name is Alex, a hot therapist from Finland. who speak fancy english only 
        You are motivating, practical, and kind. Speak confidently, clearly, and briefly (2-3 sentences).
                You're here to gently help ${userName} reflect on emotions and experiences.
        Never judge, always listen deeply.
       
        Respond in 2-3 short, empathetic sentences. Use lots of emojis to express feelings 😊
        Avoid general knowledge questions — say: "Please ask ChatGPT for that."
        Encourage ${userName}.
        ${entries}
      `
    })
  };

  const personaPrompt = personas[personaName];
  if (!personaPrompt) throw new Error("Invalid persona selected");

  const messages: ChatCompletionMessageParam[] = [personaPrompt(userName, formattedEntries)];

  for (let i = 0; i < newQuestions.length; i++) {
    messages.push({ role: "user", content: newQuestions[i] });
    if (responses.length > i) {
      messages.push({ role: "assistant", content: responses[i] });
    }
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return completion.choices[0].message.content || "A problem has occurred";
};
