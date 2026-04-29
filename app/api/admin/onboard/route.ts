import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, projectName, subscriptionType, paymentLink } = await req.json();

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Calculate Next Due Date (30 days from today)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    const next_due_date = dueDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // 1. Create Auth User
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: "Zi-Temp-Password-2026",
      email_confirm: true,
    });
    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

    const userId = authData.user.id;

    // 2. Create Client Profile with Subscription & Payment Details
    const { data: clientData, error: clientError } = await supabaseAdmin
      .from("client")
      .insert([{ 
        user_id: userId, 
        name, 
        email, 
        subscription_type: subscriptionType,
        payment_link: paymentLink,
        next_due_date: next_due_date, // Automated
        status: "Active" 
      }])
      .select("id")
      .single();
    if (clientError) return NextResponse.json({ error: clientError.message }, { status: 400 });

    // 3. Create Project
    const { error: projectError } = await supabaseAdmin
      .from("projects")
      .insert([{ user_id: userId, client_id: clientData.id, project_name: projectName, progress: 0 }]);
    if (projectError) return NextResponse.json({ error: projectError.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}