For postgres and pg_admin 4. Create a .env file, with the following fields:

POSTGRES_USER=yourUserName
POSTGRES_PASSWORD=yourPassword
POSTGRES_DB=databaseName
PGADMIN_DEFAULT_EMAIL=your@email.com
PGADMIN_DEFAULT_PASSWORD=yourPassword

in PG Admin 4 

connect to postgress by loggin in with your email and password from the .env file

the click on "Create New Server."
Give it a name.

In the "Connection" tab under "Host name/address" type postgress
post: 5432
Username: yourUserName
Password: yourPassword

Then click save.