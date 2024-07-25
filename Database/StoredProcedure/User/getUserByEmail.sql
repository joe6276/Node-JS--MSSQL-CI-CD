USE Blogs

CREATE OR ALTER PROCEDURE  getUserByEmail(@EMAIL VARCHAR(255))
AS
BEGIN
SELECT * FROM Users WHERE Email = @Email
END

EXEC getUserByEmail 'jonathan@gmail.com'