USE Blogs

CREATE OR ALTER PROCEDURE getBlog(@Id VARCHAR(255))
AS
BEGIN

SELECT b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId = a.Id WHERE b.Id= @Id
END


SELECT b.Heading, b.Description, b.ImageUrl, a.Name  FROM  BLogs as b INNER JOIN Users as a ON b.AuthorId = a.Id WHERE b.Id= '8b75088b-1593-4f6e-9951-e8e30fa6785d'
EXEC getBlog '8b75088b-1593-4f6e-9951-e8e30fa6785d'