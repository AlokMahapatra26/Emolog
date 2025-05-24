"use server"
import { handleError } from "@/lib/utils"
import { db } from "@/db/index"
import { getUser } from "@/auth/server"
import { moodEntries } from "@/db/schema"
import { eq , and} from "drizzle-orm"

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


