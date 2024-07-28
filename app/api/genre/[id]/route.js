import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export const dynamic = 'force-dynamic';

//DELETE
//http://localhost:3000/api/genre/[id]
export async function DELETE(request, {params}){
    try{
        const id = params.id;
        await prisma.mst_genre.delete({
            where:{
                id:id
            }
        })
        return new NextResponse(null, {status: 204});
    }catch(error){
        return new NextResponse(error.message, { status: 500 });
    }
}

//GET BY ID
//http://localhost:3000/api/genre/[id]
export async function GET(request, { params }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ error: 'ID harus diisi' }, { status: 400 });
        }

        const genre = await prisma.mst_genre.findUnique({
            where: { id: id }
        });

        if (!genre) {
            return NextResponse.json({ error: 'Genre tidak ditemukan' }, { status: 404 });
        }

        return NextResponse.json(genre);
    } catch (error) {
        return NextResponse.error(new Error('Failed to fetch genre'));
    }
}

//PUT
//http://localhost:3000/api/genre/[id]
export async function PUT(request, {params}){
    try{
        const id = params.id;
        const body = await request.json();

        const { name } = body;

        if(!name){
            return NextResponse.json({ error: 'Nama tidak boleh kosong' }, { status: 400 });
        }

        const updatedGenre = await prisma.mst_genre.update({
            where:{
                id: id
            },
            data:{
                name
            }
        });
        return NextResponse.json(updatedGenre);
    }catch(error){
        return NextResponse.error(new Error('gagal update genre'));
    }
}

