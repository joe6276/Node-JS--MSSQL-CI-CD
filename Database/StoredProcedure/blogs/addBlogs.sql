

USE Blogs

CREATE OR ALTER PROCEDURE addBlog(@Id VARCHAR(255), @Heading TEXT , @ImageUrl VARCHAR (255), @Description TEXT, @AuthorId VARCHAR(255))
AS
BEGIN

INSERT INTO Blogs(Id, Heading,ImageUrl,Description, AuthorId)
VALUES(@Id,@Heading,@ImageUrl,@Description,@AuthorId)

END
