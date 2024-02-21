import { NextResponse } from "next/server";

export async function POST(request: Request){
    const res = await request.json();
    console.log("Recieved data",res);
    return NextResponse.json({data:res});
}