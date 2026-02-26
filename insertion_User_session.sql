START TRANSACTION;
--Kani kay insertion sa userPOS
    INSERT INTO user_session (userID, sessionTime) VALUES
    (1, '2024-01-01 12:00:00'),
    (2, '2024-01-01 14:00:00'),
    (3, '2024-01-01 15:00:00');
COMMIT;