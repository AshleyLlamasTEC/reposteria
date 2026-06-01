DROP TRIGGER IF EXISTS tr_after_update_order_status;

DELIMITER $$

CREATE TRIGGER tr_after_update_order_status
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN

    IF NEW.state <> OLD.state THEN

        INSERT INTO audit_orders (
            order_id,
            operation,
            previous_state,
            new_state,
            changed_at,
            user_id
        )
        VALUES (
            NEW.id,
            'UPDATE',
            OLD.state,
            NEW.state,
            NOW(),
            @current_user_id
        );

    END IF;

END$$

DELIMITER ;
