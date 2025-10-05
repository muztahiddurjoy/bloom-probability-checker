import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') || '10';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const token = 'hp-otrN7Xzzg-pLNwoo5zIxArVbOUMm93r4_5brSjbA';
    const response = await fetch(
      `https://trefle.io/api/v1/species/search?q=${encodeURIComponent(query)}&limit=${limit}&token=${token}`
    );

    if (!response.ok) {
      throw new Error(`Trefle API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Trefle:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Trefle API' },
      { status: 500 }
    );
  }
}