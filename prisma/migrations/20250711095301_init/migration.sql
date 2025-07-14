-- CreateTable
CREATE TABLE "Field" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "yield" INTEGER NOT NULL,
    "machineType" TEXT[],
    "stopped" BOOLEAN NOT NULL,
    "isSowed" BOOLEAN NOT NULL,
    "currentlyCultivated" BOOLEAN NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factory" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "requiredGoods" TEXT[],
    "result" TEXT[],
    "multiplier" INTEGER NOT NULL,
    "stopped" BOOLEAN NOT NULL,

    CONSTRAINT "Factory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "onTheField" BOOLEAN NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItem" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);
