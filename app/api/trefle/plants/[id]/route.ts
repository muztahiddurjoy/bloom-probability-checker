import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Plant ID is required' }, { status: 400 });
  }

  try {
    const token = 'hp-otrN7Xzzg-pLNwoo5zIxArVbOUMm93r4_5brSjbA';
    const response = await fetch(
      `https://trefle.io/api/v1/plants/${id}?token=${token}`
    );

    if (!response.ok) {
      throw new Error(`Trefle API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching plant from Trefle:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plant data from Trefle API' },
      { status: 500 }
    );
  }
}