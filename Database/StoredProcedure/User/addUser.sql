
USE Blogs

CREATE OR ALTER PROCEDURE addUser(@Id VARCHAR(255), @Name VARCHAR(255), @Email VARCHAR(255), @Password VARCHAR(255))
AS
BEGIN
INSERT INTO users (Id,Name,Email,Password) VALUES(@Id,@Name,@Email,@Password)
END
