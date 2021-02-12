--------Function to get the price of a seat----------
CREATE OR REPLACE FUNCTION get_seat_price(val_schedule_id int, val_seat_id text)
RETURNS numeric
AS $CODE$
DECLARE
    val_route_id int;
    val_model_id int;
    val_aircraft_id int;
    val_traveler_class_id int;
    val_price numeric;
BEGIN
    SELECT route_id, aircraft_id INTO val_route_id, val_aircraft_id FROM flight_schedule WHERE schedule_id = val_schedule_id;
    SELECT model_id INTO val_model_id FROM aircraft_instance WHERE aircraft_id = val_aircraft_id;
    SELECT traveller_class_id INTO val_traveler_class_id FROM aircraft_seat WHERE model_id = val_model_id AND seat_id = val_seat_id;
    SELECT price into val_price FROM seat_price WHERE route_id = val_route_id AND traveler_class_id = val_traveler_class_id;
    RETURN val_price;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;


------Function to check for seat overlaps--------
CREATE OR REPLACE FUNCTION check_seat_overlaps(val_schedule_id int, seatNo varchar(10)[])
RETURNS bool
LANGUAGE plpgsql
AS $$
DECLARE
	bookingIDs int[];
	bookedSeats varchar(10)[];
	bookingID int;
BEGIN
	bookingIDs := ARRAY (SELECT booking_id FROM seat_booking WHERE schedule_id=val_schedule_id);

	FOREACH bookingID in ARRAY bookingIDs
	LOOP
		bookedSeats := bookedSeats || ARRAY (SELECT seat_id FROM passenger_seat WHERE booking_id = bookingID);
	END LOOP;

	IF (seatNo && bookedSeats) THEN
		RETURN true;
	ELSE
	    RETURN false;
	END IF;
END;
$$;


-----------Procedure to create a booking ----------
CREATE OR REPLACE PROCEDURE insertBooking(
    val_customer_id uuid4,
    val_schedule_id int,
    passName text[],
    passPassport text[],
    passDob date[],
    seatNo varchar(10)[],
    val_name VARCHAR(50),
    val_address varchar(100),
    val_dob DATE,
    val_gender gender_enum,
    val_passport_no VARCHAR(20),
    val_mobile VARCHAR(15),
    val_email VARCHAR(127),
    val_type VARCHAR(20)
)
LANGUAGE plpgsql
AS $$
DECLARE
 pass_count int := array_length(passName, 1);
 i int = 1;
 j int = 1;
 tot_price numeric(10,2) = 0;
 seat_price numeric(10,2)[];
 temp_price numeric(10,2);
 val_booking_id int;
 val_model_id int;

BEGIN

    IF (check_overlap_seats(val_schedule_id, seatNo) = true) THEN
		RAISE EXCEPTION 'The selected seats have been taken. Please select new seats';
	END IF;

    IF (val_type = 'guest') THEN
        val_customer_id := generate_uuid4();
        INSERT INTO customer values (val_customer_id,'guest');
        INSERT INTO guest_customer(customer_id, name, address, dob, gender, passport_no, mobile, email)
         values (val_customer_id, val_name, val_address, val_dob, val_gender, val_passport_no, val_mobile, val_email);
    END IF;

    WHILE i < pass_count+1 LOOP
        temp_price = get_seat_price(val_schedule_id, seatNo[i]);
        tot_price = tot_price + temp_price;
        seat_price = array_append(seat_price, temp_price);
        i = i + 1;
    END LOOP;

    INSERT INTO seat_booking(customer_id, schedule_id, total_price, state) VALUES(val_customer_id, val_schedule_id, tot_price, 'Not paid') RETURNING booking_id INTO val_booking_id;

    SELECT model_id INTO val_model_id FROM aircraft_instance NATURAL JOIN flight_schedule;

	WHILE j < pass_count+1 LOOP
        INSERT INTO Passenger_Seat VALUES(val_booking_id, val_model_id, seatNo[j], seat_price[j], passName[j], passPassport[j], passDob[j]);
        j = j + 1;
    END LOOP;
END;
$$;

