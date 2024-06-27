import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { path } = params;

  console.log("called with path: ", path);

  if (!path || path.length === 0) {
    return new NextResponse(JSON.stringify({ error: 'Path is required' }), { status: 400 });
  }

  const filePath = join(process.cwd(), 'app/uploads', ...path);

  if (!existsSync(filePath)) {
    console.log("File not found at: ", filePath);
    return new NextResponse('File not found', { status: 404 });
  }

  const stream = createReadStream(filePath);
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
