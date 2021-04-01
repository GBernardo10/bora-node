# Migration `20200630180828-init`

This migration has been generated by GBernardo10 at 6/30/2020, 6:08:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Event" (
"address" text  NOT NULL ,"category" text []  ,"code" text   DEFAULT E'',"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text   ,"endTime" timestamp(3)   ,"id" text  NOT NULL ,"isPublic" boolean  NOT NULL DEFAULT true,"is_free" boolean  NOT NULL DEFAULT true,"name" text  NOT NULL ,"owner" text  NOT NULL ,"password" text   DEFAULT E'',"photoUrl" text   ,"price" Decimal(65,30)  NOT NULL DEFAULT 0.0,"privacy" "PrivacyEnum" NOT NULL DEFAULT E'public',"startDay" timestamp(3)  NOT NULL ,"startEnd" timestamp(3)  NOT NULL ,"startTime" timestamp(3)   ,"streetNumber" integer  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"zipcode" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."EventGuest" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"eventFk" text  NOT NULL ,"id" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL ,"username" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."statements" DROP CONSTRAINT IF EXiSTS "statements_fk_wallet_fkey";

ALTER TABLE "public"."EventGuest" ADD FOREIGN KEY ("eventFk")REFERENCES "public"."Event"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."statements";

DROP TABLE "public"."users";

DROP TABLE "public"."wallets";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200630180828-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,49 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model Event {
+  id           String       @default(uuid()) @id
+  code         String?      @default("")
+  name         String
+  owner        String
+  description  String?
+  address      String
+  category     String[]
+  photoUrl     String?
+  createdAt    DateTime     @default(now())
+  endTime      DateTime?
+  isFree       Boolean      @default(true) @map("is_free")
+  isPublic     Boolean      @default(true)
+  password     String?      @default("")
+  price        Float        @default(0.0)
+  privacy      PrivacyEnum  @default(public)
+  startDay     DateTime
+  startEnd     DateTime
+  startTime    DateTime?
+  streetNumber Int
+  updatedAt    DateTime     @updatedAt
+  zipcode      String
+  eventGuest   EventGuest[]
+}
+
+model EventGuest {
+  id        String   @default(uuid()) @id
+  eventFk   String
+  username  String
+  Event     Event    @relation(fields: [eventFk], references: [id])
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+enum PrivacyEnum {
+  onlyFriendsOfFriends  @map("only friends of friends")
+  onlyFrinds            @map("only frinds")
+  private
+  public
+}
```

