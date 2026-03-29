import { env } from "../config/env";

export async function uploadLogo(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  // Do NOT set Content-Type manually — browser sets it with the correct multipart boundary.
  const response = await fetch(`${env.apiBaseUrl}/api/upload/logo`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Logo upload failed: ${response.status} ${body}`);
  }

  const data = (await response.json()) as { url: string };
  return data.url;
}
