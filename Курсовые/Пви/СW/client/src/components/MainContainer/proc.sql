USE MUSIIC;
GO

CREATE OR ALTER PROC signInUser
  @login     NVARCHAR(50), 
  @email     NVARCHAR(50),
  @password  NVARCHAR(50) 
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @countWithThisLogin INT, 
      @countWithThisEmail INT,
      @countWithThisLoginAndPassword INT,
      @countWithThisEmailAndPassword INT,
      @userId INT;
  BEGIN TRY
    IF (@login IS NULL AND @email IS NULL)
      RAISERROR('[ERROR] signInUser: At least one parameter — login or email — should not be null.', 17, 1);
    IF (@password IS NULL)
      RAISERROR('[ERROR] signInUser: Password cannot be null.', 17, 1);

    IF (@email IS NULL)
    BEGIN
      SET @countWithThisLogin = (SELECT COUNT(*) FROM users WHERE login = @login);
      IF (@countWithThisLogin = 0)
        RAISERROR('[ERROR] signInUser: Incorrect login.', 17, 1);

      SET @countWithThisLoginAndPassword = 
      (
        SELECT COUNT(*) 
        FROM users 
        WHERE login = @login 
          AND password = @password
      );
      IF (@countWithThisLoginAndPassword = 0)
        RAISERROR('[ERROR] signInUser: Incorrect password.', 17, 1);
      ELSE
      BEGIN
        SET @userId = (SELECT ID FROM users WHERE login = @login);
        PRINT 'Вы успешно вошли в систему! Здравствуйте, ' + LTRIM(RTRIM(@login)) + '. Ваш ID: ' + CAST(@userId AS NVARCHAR(10));
      END
      RETURN 1;
    END;
    ELSE IF (@login IS NULL)
    BEGIN
      SET @countWithThisEmail = (SELECT COUNT(*) FROM users WHERE email = @email);
      IF (@countWithThisEmail = 0)
        RAISERROR('[ERROR] signInUser: Incorrect email.', 17, 1);

      SET @countWithThisEmailAndPassword = 
      (
        SELECT COUNT(*) 
        FROM users 
        WHERE email = @email
          AND password = @password
      );
      IF (@countWithThisEmailAndPassword = 0)
        RAISERROR('[ERROR] signInUser: Incorrect password.', 17, 1);
      ELSE
      BEGIN
        SET @userId = (SELECT ID FROM users WHERE email = @email);
        PRINT 'Вы успешно вошли в систему! Здравствуйте, ' + LTRIM(RTRIM(@login)) + '. Ваш ID: ' + CAST(@userId AS NVARCHAR(10));
      END
      RETURN 1;
    END;
    ELSE
    BEGIN
      SET @countWithThisLogin = (SELECT COUNT(*) FROM users WHERE login = @login);
      IF (@countWithThisLogin = 0)
        RAISERROR('[ERROR] signInUser: Incorrect login.', 17, 1);

      SET @countWithThisLoginAndPassword = 
      (
        SELECT COUNT(*) 
        FROM users 
        WHERE login = @login 
          AND email = @email
            AND password = @password
      );
      IF (@countWithThisLoginAndPassword = 0)
        RAISERROR('[ERROR] signInUser: Incorrect password.', 17, 1);
      ELSE
      BEGIN
         INSERT INTO #SessionData (UserID, Login)
            VALUES (@userId, @login);
        SET @userId = (SELECT ID FROM users WHERE login = @login);
        PRINT 'Вы успешно вошли в систему! Здравствуйте, ' + LTRIM(RTRIM(@login)) + '. Ваш ID: ' + CAST(@userId AS NVARCHAR(10));
      END
      RETURN 1;
    END;

    RETURN 1;
  END TRY

  BEGIN CATCH
    DECLARE @errorMessage NVARCHAR(MAX), @errorSeverity INT, @errorState INT;
        SELECT  @errorMessage = ERROR_MESSAGE(), 
        @errorSeverity = ERROR_SEVERITY(),
        @errorState = ERROR_STATE();

    RAISERROR (@errorMessage, @errorSeverity, @errorState);
        RETURN -1;
  END CATCH;
END;
GO


DECLARE @result INT;
EXEC @result = signInUser @login = 'root', @email = 'darya.harlukovich@gmail.com', @password = 'root';
PRINT 'signInUser returned: ' + CAST(@result AS VARCHAR);