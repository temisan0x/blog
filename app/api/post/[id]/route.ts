import { NextResponse } from "next/server";

export function DELETE(request: Request, { params }: any) {
  const id = params.id;
  console.log({id});
  return NextResponse.json(request);
}
