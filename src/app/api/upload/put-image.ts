import { PutBlobResult } from "@vercel/blob";

/**
 * Uploads an image to object storage
 * @param file - The image to upload
 * @param path - The path in the storage
 */
export async function putImage(file: File, path: string) {
    let url: string = "";
    const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
            "content-type": file?.type || "application/octet-stream",
            "image-path-name": path,
        },
        body: file,
    });
    if (res.status === 200) {
        const r = (await res.json()) as PutBlobResult;
        url = r.url;
    } else {
        const error = await res.text();
        throw error;
    }
    return url;
}
