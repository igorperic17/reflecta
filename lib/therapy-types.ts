// Comprehensive list of therapy types and approaches
export const therapyTypes = [
  {
    id: "cbt",
    name: "Cognitive Behavioral Therapy (CBT)",
    description: "Focuses on identifying and changing negative thought patterns and behaviors."
  },
  {
    id: "dbt",
    name: "Dialectical Behavior Therapy (DBT)",
    description: "Combines cognitive-behavioral techniques with mindfulness concepts to help regulate emotions."
  },
  {
    id: "psychodynamic",
    name: "Psychodynamic Therapy",
    description: "Explores unconscious processes and how they influence current behavior."
  },
  {
    id: "interpersonal",
    name: "Interpersonal Therapy (IPT)",
    description: "Focuses on improving interpersonal relationships and social functioning."
  },
  {
    id: "humanistic",
    name: "Humanistic Therapy",
    description: "Emphasizes personal growth, self-actualization, and reaching maximum potential."
  },
  {
    id: "gestalt",
    name: "Gestalt Therapy",
    description: "Focuses on the present moment and developing self-awareness."
  },
  {
    id: "emdr",
    name: "Eye Movement Desensitization and Reprocessing (EMDR)",
    description: "Used primarily for trauma and PTSD treatment."
  },
  {
    id: "family",
    name: "Family Therapy",
    description: "Treats the family as a system and focuses on family relationships."
  },
  {
    id: "couples",
    name: "Couples Therapy",
    description: "Helps couples resolve conflicts and improve their relationship."
  },
  {
    id: "group",
    name: "Group Therapy",
    description: "Therapy conducted with a group of people facing similar issues."
  },
  {
    id: "play",
    name: "Play Therapy",
    description: "Uses play to help children express and work through their problems."
  },
  {
    id: "art",
    name: "Art Therapy",
    description: "Uses creative expression to improve mental health and well-being."
  },
  {
    id: "mindfulness",
    name: "Mindfulness-Based Therapy",
    description: "Incorporates mindfulness practices to reduce stress and improve mental health."
  },
  {
    id: "solution_focused",
    name: "Solution-Focused Brief Therapy (SFBT)",
    description: "Focuses on solutions rather than problems, with an emphasis on the present and future."
  },
  {
    id: "narrative",
    name: "Narrative Therapy",
    description: "Helps people identify their values and skills to effectively address problems."
  },
  {
    id: "acceptance",
    name: "Acceptance and Commitment Therapy (ACT)",
    description: "Focuses on accepting uncomfortable thoughts and feelings and committing to behavior change."
  },
  {
    id: "schema",
    name: "Schema Therapy",
    description: "Integrates elements from cognitive, behavioral, and other therapies to address deep-rooted patterns."
  },
  {
    id: "psychoanalytic",
    name: "Psychoanalytic Therapy",
    description: "Explores unconscious motivations established throughout childhood."
  },
  {
    id: "motivational",
    name: "Motivational Interviewing",
    description: "Helps people resolve ambivalent feelings to find motivation for change."
  },
  {
    id: "systemic",
    name: "Systemic Therapy",
    description: "Focuses on understanding the individual in the context of their relationships and social systems."
  },
  {
    id: "existential",
    name: "Existential Therapy",
    description: "Explores difficulties with the givens of human existence, including death, freedom, and isolation."
  },
  {
    id: "behavioral",
    name: "Behavioral Therapy",
    description: "Focuses on changing unwanted behaviors through conditioning and learning techniques."
  },
  {
    id: "eclectic",
    name: "Eclectic/Integrative Therapy",
    description: "Combines different therapeutic approaches based on client needs."
  }
];

// Function to get therapy type by ID
export function getTherapyTypeById(id: string) {
  return therapyTypes.find(type => type.id === id);
}

// Function to get therapy type name by ID
export function getTherapyTypeName(id: string) {
  const therapyType = getTherapyTypeById(id);
  return therapyType ? therapyType.name : "Unknown";
} 