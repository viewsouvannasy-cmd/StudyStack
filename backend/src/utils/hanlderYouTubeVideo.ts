import { YoutubeTranscript } from "youtube-transcript";

export function extractVideoId(input: string): string | null {
  if (/^[\w-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.slice(1, 12);
    if (url.hostname.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;
      const m = url.pathname.match(/^\/(shorts|embed|live)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch {
    return null;
  }
  return null;
}

export const getTranscript = async (
  videoId: string,
): Promise<string | null> => {
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    return items.map((i) => i.text).join(" ");
  } catch (error) {
    console.log(error);
    return null;
  }
};
