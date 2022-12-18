
--=============================================
-- Tests
--=============================================

\set ECHO ALL 

\c rentolio

--=============================================
-- deleting a rental change is_booked to false
--=============================================

DELETE FROM rental WHERE vehicle_id = 5;

--=============================================
-- deleting the vehicle delete also the rental (cascade)
--=============================================

-- DELETE FROM vehicle WHERE id = 1;

--=============================================
-- updating vehicle_id
--=============================================

-- Test if you want to change the vehicle
SELECT * FROM update_rental('
							{ 
							"id": 2,
							"user_id": 4, 
							"vehicle_id": 6, 
							"rent_at": "2022-12-17T15:43:24.598Z",	
							"returned_at": "2022-12-17T17:43:24.598Z" }
							');


TABLE rental ORDER BY id;
TABLE vehicle ORDER BY id;

--=============================================
-- update returned at date
--=============================================

SELECT * FROM update_rental('
							{ "user_id": 4, 
							"id": 2,
							"rent_at" : "2022-12-17T15:43:24.598Z",
							"returned_at": "2022-12-17T20:43:24.598Z" }
							');

TABLE rental ORDER BY id;
TABLE vehicle ORDER BY id;