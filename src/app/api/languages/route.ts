import { list } from "@/lib/services/language";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get("page") || "0";
    const size = req.nextUrl.searchParams.get("size") || "25";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "name";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "ASC";
    const filterField = req.nextUrl.searchParams.get("filterField");
    const filterOperator = req.nextUrl.searchParams.get("filterOperator");
    const filterValue = req.nextUrl.searchParams.get("filterValue");

    const result = await list({
        page: parseInt(page as string, 10),
        size: parseInt(size as string, 10),
        sortBy: sortBy as string,
        sortOrder: sortOrder as string,
        filterField: filterField,
        filterOperator: filterOperator,
        filterValue: filterValue,
    });

    if ("error" in result) {
        return NextResponse.json(
            { error: result.error },
            { status: result.status }
        );
    }

    return NextResponse.json(result, { status: 200 });
}
