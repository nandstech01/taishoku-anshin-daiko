import { NextResponse } from 'next/server';
import { getDiagnosisCounts } from '@/lib/supabase/diagnosis-counter';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const counts = await getDiagnosisCounts();
    
    return NextResponse.json(counts, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('[Diagnosis Counts API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diagnosis counts' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  }
} 