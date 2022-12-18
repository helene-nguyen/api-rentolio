# Change if needed the port number

alldata:
	psql -U postgres -p 5433 -f ./data/migration.sql
	psql -U postgres -p 5433 -f ./data/seed.sql
	# remove "#" for Linux
	# sudo -iu postgres psql -p 5434 -f /home/yumicode/Desktop/api-rentals/data/migration.sql
	# sudo -iu postgres psql -p 5434 -f /home/yumicode/Desktop/api-rentals/data/migration.sql

data-migration:
	psql -U postgres -p 5433 -f ./data/migration.sql

data-seed:
	psql -U postgres -p 5433 -f ./data/seed.sql

data-test:
	psql -U postgres -p 5433 -f ./data/test.sql
