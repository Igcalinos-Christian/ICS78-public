START TRANSACTION;
--Kani kay insertion sa userLogs
    INSERT INTO user_logs (userID, activity) VALUES
    (1, 'Admin logged in'),
    (2, 'Manager logged in'),
    (3, 'User logged in');
COMMIT;