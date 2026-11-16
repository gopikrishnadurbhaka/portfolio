import { z } from "zod";

export const enquiryTypes = [
  { value: "advisory", label: "Advisory" },
  { value: "speaking", label: "Speaker Invitation" },
  { value: "research", label: "Research Collaboration" },
  { value: "media", label: "Media & Interviews" },
  { value: "other", label: "Other" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  organisation: z.string().trim().max(160, "Organisation is too long").optional().default(""),
  enquiryType: z.enum(["advisory", "speaking", "research", "media", "other"]),
  preferredTimeIst: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10, "Please write at least a short message").max(3000, "Message is too long"),
  // Honeypot: real visitors never fill this hidden field.
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
