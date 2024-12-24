"use server";
import { newsletterQuery } from "@/utils/customer";

export async function newsletterSignUp({ email }) {
   const result = await newsletterQuery(email);
   return result;
}
