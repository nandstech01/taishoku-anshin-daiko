import { NextResponse } from 'next/server';
import { checkDatabaseNumbers } from '@/utils/debug';

export async function GET() {
  try {
    const result = await checkDatabaseNumbers();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Debug API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check numbers' },
      { status: 500 }
    );
  }
} 