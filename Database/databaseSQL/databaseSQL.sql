-- Create a new database called 'DatabaseQuestions'
-- Connect to the 'master' database to run this snippet
-- Create a new database called 'DatabaseQuestions'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'DatabaseQuestions'
)
CREATE DATABASE DatabaseQuestions
GO

-- Add a new column 'Questions' to table 'TableName' in schema 'SchemaName'
ALTER TABLE DatabaseQuestions
    ADD Questions /*new_column_name*/ TEXT /*new_column_datatype*/ /*new_column_nullability*/
GO

-- Add a new column 'Answers' to table 'TableName' in schema 'SchemaName'
ALTER TABLE DatabaseQuestions
    ADD Answers /*new_column_name*/ TEXT /*new_column_datatype*/ /*new_column_nullability*/
GO