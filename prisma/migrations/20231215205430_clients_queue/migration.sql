-- CreateTable
CREATE TABLE "clientsqueue" (
    "id" SERIAL NOT NULL,
    "queueId" TEXT NOT NULL,

    CONSTRAINT "clientsqueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clientsqueue" ADD CONSTRAINT "clientsqueue_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
