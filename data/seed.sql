--========================================
-- Seed
--========================================
\set ECHO ALL 

\c rentolio

INSERT INTO "user"("name","password")
VALUES 
	('alpha','alpha'),
	('beta','beta'),
	('gamma','gamma'),
	('delta','delta');

TABLE "user";


INSERT INTO "category"("name")
VALUES 
	('economy'),
	('compact'),
	('standard'),
	('sport'),
	('truck'),
	('suv'),
	('van');

TABLE "category";

INSERT INTO "brand"("name")
VALUES 
	('Peugeot'),
	('Kia'),
	('Audi'),
	('Renault'),
	('Opel'),
	('Tesla');

TABLE "brand";

INSERT INTO "vehicle"("category_id","brand_id", "reference")
VALUES 
	(4, 3,'ref-1'),
	(2, 1,'ref-2'),
	(2, 3,'ref-3'),
	(7, 4,'ref-4'),
	(5, 4,'ref-5'),
	(1, 1,'ref-6');
	
TABLE "vehicle";

INSERT INTO "rental"("user_id", "vehicle_id")
VALUES
	(1,1),
	(4,2),
	(4,3),
	(4,4),
	(3,5);

TABLE "rental";
TABLE "vehicle";