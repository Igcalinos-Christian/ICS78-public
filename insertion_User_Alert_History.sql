START TRANSACTION;
--Kani kay insertion sa usersAlertHistory
    INSERT INTO user_alert_history (userID, AlertHistory) VALUES
    (1, 'Admin Alert'),
    (2, 'Manager Alert'),
    (3, 'User Alert');
COMMIT;