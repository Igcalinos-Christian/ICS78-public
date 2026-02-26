START TRANSACTION;
--Kani kay insertion sa users
    INSERT INTO users (username, password, role) VALUES
    ('admin', 'admin123', 'admin'),
    ('manager', 'manager123', 'manager'),
    ('user', 'user123', 'user');
COMMIT;