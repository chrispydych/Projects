/*Need to find the location of each ancient temple, continent/country/Longitude&Latitude Position*/

USE master;
GO
CREATE DATABASE LocationOfTemples
ON
(
    CREATE TABLE Locations
    (
        Continent VARCHAR(255),
        Country VARCHAR(255),
        TempleName VARCHAR(255),
        Longitude FLOAT,
        Latitude FLOAT
    )
)
