import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export const dynamic = 'force-dynamic';

//GET
//http://localhost:3000/api/genre?page=1&perPage=10&search=
export async function GET(request){
    const urlParams = new URL(request.url);
    const page = urlParams.searchParams.get('page') || 1;
    const perPage = urlParams.searchParams.get('perPage') || 10;
    const searchQuery = urlParams.searchParams.get('search') || '';

    let parsedPage = parseInt(page);
    let parsedPerPage = parseInt(perPage);

    if (isNaN(parsedPage) || isNaN(parsedPerPage)) {
        console.error('Invalid page or perPage value');
        return NextResponse.error(new Error('Invalid page or perPage value'));
    }

    try{
        const skip = (parsedPage - 1) * parsedPerPage;
        const where = searchQuery
            ? {
                OR: [
                    { name: { contains: searchQuery, mode: 'insensitive' } },
                ],
            }
            : {};
        const genre = await prisma.mst_genre.findMany({
            take: parsedPerPage,
            skip: skip,
            where: where,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(genre);
    }catch(error){
        return NextResponse.error(new Error('Gagal get data genre'));
    }
}

//POST
//http://localhost:3000/api/genre
export async function POST(request){
    try{
        const body = await request.json();
        const { name } = body;

        if(!name){
            return NextResponse.json({error: 'Nama tidak boleh kosong'}, {status: 400});
        }
        const newGenre = await prisma.mst_genre.create({
            data:{
                name
            },
        });

        return NextResponse.json(newGenre);
    }catch(error){
        return NextResponse.error(new Error('gagal create genre'));
    }
}