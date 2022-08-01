-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "passwordSalt" VARCHAR(100) NOT NULL,
    "passwordHash" VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "scope" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
