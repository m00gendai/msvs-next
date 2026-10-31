import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const res = await fetch(
    `https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${id}/temporary_url`,
    {
      headers: { Authorization: `Bearer ${process.env.KDRIVE}` },
      next: { revalidate: 600 },
    }
  );

  if (!res.ok) return NextResponse.redirect(process.env.ARCHIVE!);
  const json = await res.json();
  return NextResponse.redirect(json.data?.temporary_url ?? process.env.ARCHIVE!);
}