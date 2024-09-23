import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { addItem } from "@/app/lib/schemas/schema";

export async function GET(req:NextRequest){
    const id=req.nextUrl.searchParams.get("id");
    if (id===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    const itemId=parseInt(id);
    try{
        let reviews=await prisma.reviews.findMany({
            where:{
                itemId:itemId
            }
        })
        return NextResponse.json({"message":"Review fetched successfully",reviews:reviews});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}