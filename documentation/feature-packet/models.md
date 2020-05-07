# Models

## Projects

* ID (primary key)
* Name (not null)
* Creator ID (foreign key referencing ID in Users)

## Columns

* ID (primary key)
* Name

## Tasks

* ID (primary key)
* Heading (not null)
* Description (allow null)
* Column ID (foreign key referencing ID in Columns)
* Row ID

## Users

* ID (primary key)
* Name (not null)
* Hashed password (not null)

## NonCreatorsProjects

* nonCreatorId (foreign key referencing ID in Users)
* projectId (foreign key referencing ID in Projects)

## UsersTasks

* userId (foreign key referencing ID in Users)
* taskId (foreign key referencing ID in Tasks)

## Associations

* Projects and Tasks: one-to-many
* Projects and Users: many-to-many
* Tasks and Users: many-to-many
* Projects and Columns: one-to-many
* Columns and Tasks: one-to-many
