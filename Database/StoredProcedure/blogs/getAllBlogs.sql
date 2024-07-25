

USE Blogs

CREATE OR ALTER PROCEDURE getAllBlogs
AS
BEGIN

SELECT b.Id, b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId =a.Id
END


EXEC getAllBlogs