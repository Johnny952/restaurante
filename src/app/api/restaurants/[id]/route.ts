import { getById, softDelete } from "@/lib/services/restaurant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const result = await getById(id as string);
    if ("error" in result) {
        return NextResponse.json(
            { error: result.error },
            { status: result.status }
        );
    }
    return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const resultDeletion = await softDelete(id as string);
    if (resultDeletion && "error" in resultDeletion) {
        return NextResponse.json(
            { error: resultDeletion.error },
            { status: resultDeletion.status }
        );
    }
    return NextResponse.json(resultDeletion, { status: 200 });
}
