import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";

/** Public endpoint: validates the enquiry and stores it. Returns ok only when the row is saved. */
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_enquiries").insert({
      name: data.name,
      email: data.email,
      organisation: data.organisation || null,
      enquiry_type: data.enquiryType,
      preferred_time_ist: data.preferredTimeIst || null,
      message: data.message,
    });
    if (error) {
      console.error("contact_enquiries insert failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
