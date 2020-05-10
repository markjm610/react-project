# Models

## Projects

* ID (primary key)
* Name (not null)
* Creator ID (foreign key referencing ID in Users)

## Columns

* ID (primary key)
* Name
* Project ID (foreign key referencing ID in Projects)
* PageColumnID - stores the location of the column on the page

## Tasks

* ID (primary key)
* Heading (not null)
* Description (allow null)
* Creator ID (foreign key referencing ID in Users)
* Column ID (foreign key referencing ID in Columns)
* Row ID - stores the location of the task in a column

## Users

* ID (primary key)
* Name (not null)
* Hashed password (not null)
* Profile picture

## UsersProjects

* userId (foreign key referencing ID in Users)
* projectId (foreign key referencing ID in Projects)

## Associations

* Projects and Users: many-to-many
* Users and Tasks: one-to-many
* Projects and Columns: one-to-many
* Columns and Tasks: one-to-many
