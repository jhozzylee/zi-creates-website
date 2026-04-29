"use server";
import { createClient } from "@supabase/supabase-js";

export async function onboardClientAction(formData: {
  email: string;
  name: string;
  projectName: string;
}) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // STEP 1: Create the User in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: formData.email,
      password: "ZiCreatesTemporary123!", 
      email_confirm: true
    });

    if (authError) throw authError;
    const newUserId = authData.user.id;

    // STEP 2: Create the Client Profile
    // We use .select() so we can get the 'id' that Supabase generates
    const { data: clientData, error: clientError } = await supabaseAdmin
      .from("client")
      .insert([
        { 
          user_id: newUserId, 
          name: formData.name, 
          email: formData.email,
          status: "Active" 
        }
      ])
      .select("id") 
      .single();

    if (clientError) throw clientError;
    
    // This is the 'id' from your client table
    const createdClientId = clientData.id;

    // STEP 3: Create the Project linked to that Client
    const { error: projectError } = await supabaseAdmin.from("projects").insert([
      {
        user_id: newUserId,     // Links to Auth
        client_id: createdClientId, // Links to your 'client' table 'id'
        project_name: formData.projectName,
        current_phase: "Discovery",
        progress: 0,
        status: "Active"
      }
    ]);

    if (projectError) throw projectError;

    return { success: true };
  } catch (error: any) {
    console.error("Onboarding Error:", error.message);
    return { success: false, error: error.message };
  }
}