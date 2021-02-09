CREATE OR REPLACE FUNCTION get_seat_price(val_schedule_id int, val_seat_id int)
RETURNS numeric
AS $CODE$
DECLARE
    val_route_id int;
    val_model_id int;
    val_aircraft_id int;
    val_traveler_class_id int;
    val_price numeric;
BEGIN
    SELECT route_id INTO val_route_id, aircraft_id INTO val_aircraft_id FROM flight_schedule WHERE schedule_id = val_schedule_id;
    SELECT model_id INTO val_model_id FROM aircraft_instance WHERE aircraft_id = val_aircraft_id;
    SELECT traveler_class_id INTO val_traveler_class_id FROM aircraft_seat WHERE model_id = val_model_id AND seat_id = val_seat_id;
    SELECT price into val_price FROM seat_price WHERE route_id = val_route_id AND traveler_class_id = val_traveler_class_id;
    RETURN val_price;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;



CREATE OR REPLACE PROCEDURE insert_booking(customer_id int, schedule_id int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN



END;
$$;