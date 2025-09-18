import { supabase } from '@/lib/supabase/clients';
import { NextRequest } from 'next/server';




export async function POST(request: NextRequest) {
  const { email, name, phone } = await request.json();
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, name, phone }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}