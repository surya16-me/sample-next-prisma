-- CreateTable
CREATE TABLE "mst_genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mst_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mst_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "idGenre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mst_books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mst_books" ADD CONSTRAINT "mst_books_idGenre_fkey" FOREIGN KEY ("idGenre") REFERENCES "mst_genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
