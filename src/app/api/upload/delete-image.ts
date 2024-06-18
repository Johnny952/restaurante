"use server"
import { del } from "@vercel/blob";

/**
 * Delete an image in the storage
 * @param url - The url of the image
 * @returns 
 */
export async function deleteImage(url: string) {
    return del(url);
}