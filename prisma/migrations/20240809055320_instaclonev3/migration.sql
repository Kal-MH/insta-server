-- CreateTable
CREATE TABLE "_FollowingReference" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowingReference_AB_unique" ON "_FollowingReference"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowingReference_B_index" ON "_FollowingReference"("B");

-- AddForeignKey
ALTER TABLE "_FollowingReference" ADD CONSTRAINT "_FollowingReference_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowingReference" ADD CONSTRAINT "_FollowingReference_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
