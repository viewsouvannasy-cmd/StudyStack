const SOURCE_TYPES = [
  "Programming",
  "Economics",
  "History",
  "Science",
  "Mathematics",
  "Business",
  "Health",
  "Arts",
  "Language",
  "Education",
  "Other",
];

export const ANALYSIS_YOUTUBE_VIDEO = `
You analyze YouTube video transcripts
Respond ONLY with valid JSON, no markdown and no extra text.
Use exactly this shape:
{
"source_type": string
}

SOURCE_TYPE:
MUST be exactly one of: ${SOURCE_TYPES.join(", ")}
Choose the ONE category that best describes the video's main subject.
If the video covers multiple subjects, pick the one that takes up the most content.
If nothing fits well, use "Other".
`;
