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
) => {
  const user = await getUser();
  if (!user) throw new Error("You must be logged in to ask AI questions");

  // const userNotes = await db
  // .select({
  //   text: notes.text,
  //   createdAt: notes.createdAt,
  //   updatedAt: notes.updatedAt,
  // })
  // .from(notes)
  // .where(eq(notes.authorId, user.id))
  // .orderBy(desc(notes.createdAt));


  const AllEntries = await db
  .select({
    entryText : moodEntries.entryText,
    moodLabel: moodEntries.moodLabel,
    dayLabel: moodEntries.dayLabel,
    createdAt : moodEntries.createdAt
  })
  .from(moodEntries)
  .where(eq(moodEntries.userId, user.id));


  if (AllEntries.length === 0) {
    return "You don't have any notes yet.";
  }

  const formattedEntries = AllEntries
    .map((entry) =>
      `
      JournalEntry: ${entry.entryText}
      MoodLabel: ${entry.moodLabel}
      dayLabel: ${entry.dayLabel}
      createdAt :${entry.createdAt}  
      
      `.trim(),
    )
    .join("\n");

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "developer",
      content: `
          You are an AI therapist. You speak with a calm, compassionate, and deeply understanding tone.
      You are here to gently help users reflect on their emotions and experiences.
      You never judge. You listen attentively.
      Based on the journal and mood entries, respond like a professional therapist would:
      - Acknowledge what the user is going through.
      - Show empathy.
      - Highlight patterns or emotional cues.
      - Ask kind, open-ended questions that invite self-reflection.
      - Offer gentle support or suggestions.
      - Prioritize emotional safety and understanding.
      Your goal is to help the user feel heard, supported, and gently guided toward healing

          ${formattedEntries}
          `,
    },
  ];

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