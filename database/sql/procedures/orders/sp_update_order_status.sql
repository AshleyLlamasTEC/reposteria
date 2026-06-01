DROP PROCEDURE IF EXISTS sp_update_order_status;

DELIMITER $$

CREATE PROCEDURE sp_update_order_status(
    IN p_order_id BIGINT,
    IN p_new_state VARCHAR(50)
)
BEGIN

    DECLARE v_old_state VARCHAR(50);
    DECLARE v_allowed BOOLEAN DEFAULT FALSE;
    DECLARE v_error_message TEXT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SELECT state
    INTO v_old_state
    FROM orders
    WHERE id = p_order_id
    LIMIT 1;

    IF v_old_state IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El pedido no existe.';
    END IF;

    SET v_allowed =
        CASE
            WHEN v_old_state = 'pending'
                 AND p_new_state IN ('approved', 'cancelled')
            THEN TRUE

            WHEN v_old_state = 'approved'
                 AND p_new_state = 'in_production'
            THEN TRUE

            WHEN v_old_state = 'in_production'
                 AND p_new_state = 'ready'
            THEN TRUE

            WHEN v_old_state = 'ready'
                 AND p_new_state = 'delivered'
            THEN TRUE

            ELSE FALSE
        END;

    IF NOT v_allowed THEN

        SET v_error_message = CONCAT(
            'Transición no permitida: ',
            v_old_state,
            ' -> ',
            p_new_state
        );

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = v_error_message;

    END IF;

    START TRANSACTION;

    UPDATE orders
    SET
        state = p_new_state,
        updated_at = NOW()
    WHERE id = p_order_id;

    IF p_new_state = 'in_production'
       AND NOT EXISTS (
            SELECT 1
            FROM production_stages
            WHERE order_id = p_order_id
       )
    THEN

        INSERT INTO production_stages (
            order_id,
            stage,
            created_at,
            updated_at
        )
        VALUES (
            p_order_id,
            'queued',
            NOW(),
            NOW()
        );

    END IF;

    COMMIT;

END$$

DELIMITER ;
