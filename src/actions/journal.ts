"use server"
import { handleError } from "@/lib/utils"
import { db } from "@/db/index"
import { getUser } from "@/auth/server"
import { moodEntries } from "@/db/schema"

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
