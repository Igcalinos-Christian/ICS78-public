START TRANSACTION;
--Kani kay insertion sa userPOS
    INSERT INTO userPOS (userID, position) VALUES
    (1, 'wala mi kabalo'),
    (2, 'natulog sa ilahang balay'),
    (3, 'wala ni adto sa skwelahan');

COMMIT;