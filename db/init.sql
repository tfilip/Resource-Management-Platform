CREATE TABLE "Organisation" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"admin_id" int NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	CONSTRAINT "Organisation_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "User" (
	"id" serial NOT NULL UNIQUE,
	"org_id" int NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Role" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"org_modify" bool NOT NULL,
	"resource_view" bool NOT NULL,
	"resource_create" bool NOT NULL,
	"resource_delete" bool NOT NULL,
	"resource_reserve" bool NOT NULL,
	CONSTRAINT "Role_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "UserRole" (
	"user_id" int NOT NULL,
	"role_id" int NOT NULL,
	CONSTRAINT "UserRole_pk" PRIMARY KEY ("user_id","role_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Resource" (
	"id" serial NOT NULL UNIQUE,
	"org_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "Resource_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Reservation" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"description" varchar(255) NOT NULL,
	"resource_id" int NOT NULL,
	"start_date" serial NOT NULL,
	"end_date" serial NOT NULL,
	"canceled" BOOLEAN NOT NULL,
	CONSTRAINT "Reservation_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_fk0" FOREIGN KEY ("admin_id") REFERENCES "User"("id");

ALTER TABLE "User" ADD CONSTRAINT "User_fk0" FOREIGN KEY ("org_id") REFERENCES "Organisation"("id");


ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("id");
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_fk1" FOREIGN KEY ("role_id") REFERENCES "Role"("id");

ALTER TABLE "Resource" ADD CONSTRAINT "Resource_fk0" FOREIGN KEY ("org_id") REFERENCES "Organisation"("id");

ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("id");
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_fk1" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id");

