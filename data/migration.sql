--========================================
-- Start
--========================================
-- if you want to display the output from commands
\set ECHO ALL 

DROP DATABASE IF EXISTS rentolio;

CREATE DATABASE rentolio;

\c rentolio

--========================================
-- Model
--========================================

DROP TABLE "user", "category","brand","vehicle", "rental";

CREATE TABLE IF NOT EXISTS "user"(
"id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
"name" TEXT,
"password" VARCHAR(128)
);


CREATE TABLE IF NOT EXISTS "category"(
	"id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
	"name" TEXT
);

CREATE TABLE IF NOT EXISTS "brand"(
	"id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
	"name" TEXT
);

CREATE TABLE IF NOT EXISTS "vehicle"(
	"id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"category_id" INT NOT NULL,
	"brand_id" INT NOT NULL,
	"reference" TEXT,
    "is_booked" BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS "rental"(
	"id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
	"user_id" INT NOT NULL,
	"vehicle_id" INT NOT NULL,
    "rent_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "returned_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS "vehicle"
    ADD CONSTRAINT fk_vehicle_category
	FOREIGN KEY ("category_id")
    REFERENCES "category" ("id") 
    ON DELETE CASCADE;
	
ALTER TABLE IF EXISTS "vehicle"
    ADD CONSTRAINT fk_vehicle_brand
	FOREIGN KEY ("brand_id")
    REFERENCES "brand" ("id") 
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS "rental"
    ADD CONSTRAINT fk_rental_user
	FOREIGN KEY ("user_id")
    REFERENCES "user" ("id") 
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS "rental"
    ADD CONSTRAINT fk_rental_vehicle
    FOREIGN KEY ("vehicle_id")
    REFERENCES "vehicle" ("id") 
    ON DELETE CASCADE;

--========================================
-- Create trigger when insert or delete
--========================================
-- if is_booked = true => cancel insertion
-- if insert, change value is_booked
CREATE OR REPLACE FUNCTION rental_tg() 
RETURNS TRIGGER AS $rental_tg$
    BEGIN
		IF (TG_OP = 'DELETE') THEN
    		UPDATE "vehicle" 
			SET is_booked = false
			WHERE vehicle.id = OLD.vehicle_id;
			
			RETURN OLD;
        END IF;

		IF (TG_OP = 'INSERT' AND 
			(SELECT count(V.is_booked) > 0 FROM vehicle as V
					WHERE V.id = NEW.vehicle_id
				    AND V.is_booked = true)) 
		THEN
            -- Will abort the transaction
			RAISE EXCEPTION 'You cannot insert a vehicle_id that already used --> %', NEW.vehicle_id
      		USING HINT = 'Please check your ID';
        END IF;
		
		UPDATE "vehicle"
		SET is_booked = true
		WHERE vehicle.id = NEW.vehicle_id;
		
		RETURN NEW;
      	
    END;
$rental_tg$ LANGUAGE plpgsql;

-- DROP TRIGGER rental_tg ON rental;

CREATE TRIGGER rental_tg 
BEFORE INSERT OR DELETE ON rental
FOR EACH ROW EXECUTE FUNCTION rental_tg();

--========================================
-- Create trigger on rental table update
--========================================

CREATE OR REPLACE FUNCTION rental_update_tg() 
RETURNS TRIGGER AS $rental_update_tg$
    BEGIN
				UPDATE "vehicle" 
				SET is_booked = false
				WHERE vehicle.id = OLD.vehicle_id;

				UPDATE "vehicle" 
				SET is_booked = true
				WHERE vehicle.id = NEW.vehicle_id;
		
		RETURN NEW;     	
    END;
$rental_update_tg$ LANGUAGE plpgsql;

CREATE TRIGGER rental_update_tg 
AFTER UPDATE ON rental
FOR EACH ROW EXECUTE FUNCTION rental_update_tg();

--========================================
-- Check existing tables
--========================================

TABLE "user";
TABLE "category";
TABLE "brand";
TABLE "rental";
TABLE "vehicle";

--========================================
-- Create function create rental
--========================================
DROP FUNCTION create_rental;

CREATE
OR REPLACE FUNCTION create_rental(json) 
RETURNS TABLE (inserted_rental_id INT) AS $$

BEGIN
INSERT INTO 
        "rental" (
        "user_id",
        "vehicle_id",
        "returned_at"
    )
VALUES
(
        ($1 ->> 'user_id')::INTEGER,
        ($1 ->> 'vehicle_id')::INTEGER,
        ($1 ->> 'returned_at')::TIMESTAMPTZ
);
    RETURN QUERY 
    (SELECT R.id
     FROM "rental" as R
     ORDER BY R.id DESC LIMIT 1);

    END

$$ LANGUAGE plpgsql VOLATILE;

--========================================
-- Create function update rental
--========================================

DROP FUNCTION update_rental;

CREATE OR REPLACE FUNCTION update_rental(json)
RETURNS TABLE ( updated_rental_id INT,
			    user_id INT,
			    updated_vehicle_id INT
			  ) AS $$


BEGIN
RAISE NOTICE '%', ($1 ->> 'returned_at');
UPDATE
    "rental" AS R
SET
    "vehicle_id" = COALESCE(($1 ->> 'vehicle_id')::INT, "vehicle_id"),
    "rent_at" = COALESCE(($1 ->> 'rent_at')::TIMESTAMPTZ, "rent_at"),
	"returned_at" = COALESCE(($1 ->> 'returned_at')::TIMESTAMPTZ, "returned_at")
    
WHERE
    R."id" = ($1->> 'id')::INT --rental id
	AND R."user_id" = ($1->> 'user_id')::INT;
    
RETURN QUERY 
    (SELECT R.id, R.user_id, R.vehicle_id 
	 FROM "rental" as R
	 WHERE R.id = ($1 ->> 'id')::INT);

END

$$ LANGUAGE plpgsql VOLATILE;
