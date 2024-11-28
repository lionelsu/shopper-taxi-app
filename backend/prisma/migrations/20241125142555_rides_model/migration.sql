-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "driverName" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);
