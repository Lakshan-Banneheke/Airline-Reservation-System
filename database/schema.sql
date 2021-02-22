DROP TRIGGER IF EXISTS afterbookingInsertTrigger ON Seat_Booking;
DROP TRIGGER IF EXISTS beforebookingCancellationTrigger ON Seat_Booking;

DROP PROCEDURE IF EXISTS registerCustomer;
DROP PROCEDURE IF EXISTS increaseNumBookings;
DROP PROCEDURE IF EXISTS decreaseNumBookings;
DROP PROCEDURE IF EXISTS scheduleFlights;
DROP PROCEDURE IF EXISTS deleteSchedule;
DROP PROCEDURE IF EXISTS handleFlightArrival;
DROP PROCEDURE IF EXISTS handleFlightDeparture;
DROP PROCEDURE IF EXISTS registerStaff;
DROP PROCEDURE IF EXISTS insert_route_price;
DROP PROCEDURE IF EXISTS insert_seats;

DROP FUNCTION IF EXISTS insertBooking;

DROP DOMAIN IF EXISTS UUID4 CASCADE;

DROP TABLE IF EXISTS Organizational_Info CASCADE;
DROP TABLE IF EXISTS Customer_Category CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Registered_Customer CASCADE;
DROP TABLE IF EXISTS Traveller_Class CASCADE;
DROP TABLE IF EXISTS Location CASCADE;
DROP TABLE IF EXISTS Airport CASCADE;
DROP TABLE IF EXISTS Aircraft_Model CASCADE;
DROP TABLE IF EXISTS Aircraft_Seat CASCADE;
DROP TABLE IF EXISTS Aircraft_Instance CASCADE;
DROP TABLE IF EXISTS Route CASCADE;
DROP TABLE IF EXISTS Flight_Schedule CASCADE;
DROP TABLE IF EXISTS Seat_Price CASCADE;
DROP TABLE IF EXISTS Seat_Booking CASCADE;
DROP TABLE IF EXISTS Passenger_Seat CASCADE;
DROP TABLE IF EXISTS Customer_Review CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS Guest_Customer CASCADE;

DROP TYPE IF EXISTS  booking_state_enum;
DROP TYPE IF EXISTS  flight_state_enum;
DROP TYPE IF EXISTS  aircraft_state_enum;
DROP TYPE IF EXISTS  gender_enum;
DROP TYPE IF EXISTS  customer_state_enum;
DROP TYPE IF EXISTS  staff_category;
DROP TYPE IF EXISTS  registered_customer_category;
DROP TYPE IF EXISTS  staff_account_state;

DROP VIEW IF EXISTS flight_info_passenger CASCADE;
DROP VIEW IF EXISTS booking_id_vs_category CASCADE;
DROP VIEW IF EXISTS passenger_details_only CASCADE;
DROP VIEW IF EXISTS booked_user_details CASCADE;
DROP VIEW IF EXISTS details_except_booked_person CASCADE;

SET TIME ZONE 'Etc/UTC';
---------------------------------- ENUMS SCHEMA ------------------------------------

CREATE TYPE flight_state_enum AS ENUM(
'Scheduled',
'Departed-On-Time',
'Delayed-Departure',
'Landed',
'Cancelled'
);

 CREATE TYPE aircraft_state_enum AS ENUM( 
 'On-Ground',
 'In-Air');  

CREATE TYPE booking_state_enum AS ENUM(
'Not paid',
'Paid'); 

CREATE TYPE gender_enum AS ENUM(
'Male',
'Female',
'Other'); 

CREATE TYPE customer_state_enum AS ENUM(
'guest',
'registered'
);

CREATE TYPE registered_customer_category AS ENUM(
'General',
'Frequent',
'Gold'
);

CREATE TYPE staff_category AS ENUM(
'admin',
'manager',
'general'
);

CREATE TYPE staff_account_state AS ENUM(
'verified',
'unverified'
);

------------------------------------DOMAIN SCHEMA ---------------------------------------

CREATE DOMAIN UUID4 AS char(36)
CHECK (VALUE ~ '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}');


----------------------------------  FUNCTION SCHEMA  ------------------------------------

----Function to create UUID for tables

CREATE OR REPLACE FUNCTION generate_uuid4 ()
    RETURNS char( 36
)
AS $$
DECLARE
    var_uuid char(36);
BEGIN
    SELECT
        uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text)
            PLACING '4' FROM 13)
        PLACING to_hex(floor(random() * (11 - 8 + 1) + 8)::int)::text FROM 17)::cstring) INTO var_uuid;
    RETURN var_uuid;
END
$$
LANGUAGE PLpgSQL;

----- Function to get a time stamp from date and time

CREATE OR REPLACE FUNCTION get_timestamp(val_date DATE, val_time TIME)
RETURNS timestamp
AS $CODE$
DECLARE
val_datetime timestamp;
BEGIN
  val_datetime := (val_date||' '||val_time)::timestamp ;
  RETURN val_datetime;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

-----Function to calculate age

CREATE OR REPLACE FUNCTION get_age( birthday date )
RETURNS int
AS $CODE$
BEGIN
    RETURN date_part('year', age(birthday))::int;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

----Function to calculate arrival time for a flight

CREATE OR REPLACE FUNCTION get_arrival(val_route_id int, val_departure_datetime timestamp)
RETURNS timestamp
AS $CODE$
DECLARE
  val_duration interval;
  val_arrival_datetime timestamp;
BEGIN
  SELECT duration INTO val_duration FROM route WHERE route_id=val_route_id;
  val_arrival_datetime = val_departure_datetime + val_duration;
  RETURN val_arrival_datetime;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;


-- -FUNCTION TO FIND AIRPORT ADDRESS
CREATE OR REPLACE FUNCTION getLocation(val_airport_code varchar)
RETURNS text

AS $$
DECLARE
val_location_id int;
val_parent_id int=0;
loc_address text:='('||val_airport_code||')';
val_name varchar;


BEGIN
raise notice 'Counter %', val_airport_code;
SELECT location_id INTO val_location_id FROM airport WHERE airport_code=val_airport_code;
SELECT location_id INTO val_parent_id FROM airport WHERE airport_code=val_airport_code;

WHILE val_parent_id >0 LOOP
SELECT name,parent_id INTO val_name,val_parent_id FROM location WHERE location_id=val_location_id;
raise notice 'Couddnter %', val_location_id;
loc_address:=loc_address||' '||val_name;
raise notice ' %',loc_address;
val_location_id:=val_parent_id;
END LOOP;
RETURN loc_address;
END;
$$
LANGUAGE plpgsql IMMUTABLE;


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

-----------Function to create a booking ----------
CREATE OR REPLACE FUNCTION insertBooking(
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
RETURNS int
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

    IF (check_seat_overlaps(val_schedule_id, seatNo) = true) THEN
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

    SELECT model_id INTO val_model_id FROM aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=val_schedule_id;

    WHILE j < pass_count+1 LOOP
            INSERT INTO Passenger_Seat VALUES(val_booking_id, val_model_id, seatNo[j], seat_price[j], passName[j], passPassport[j], passDob[j]);
            j = j + 1;
    END LOOP;
    RETURN val_booking_id;
END;
$$;



----------------------------------  TABLE SCHEMA --------------------------------------

CREATE TABLE Organizational_Info (
  airline_name  varchar(30) NOT NULL,
  airline_hotline varchar(20) NOT NULL,
  airline_email varchar(50) NOT NULL,
  airline_address varchar(100) NOT NULL,
  airline_account_no varchar(30) NOT NULL,
  PRIMARY KEY (airline_name)
);


CREATE TABLE Customer_Category (
  cat_name registered_customer_category,
  discount_percentage NUMERIC(4,2) NOT NULL,
  min_bookings SMALLINT NOT NULL,
  PRIMARY KEY (cat_name)
);

CREATE TABLE Customer (
  customer_id uuid4 DEFAULT generate_uuid4 (),
  type customer_state_enum NOT NULL,
  PRIMARY KEY (customer_id)
);

CREATE TABLE Registered_Customer (
  customer_id uuid4,
  email VARCHAR(127) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  category  registered_customer_category NOT NULL DEFAULT 'General', --Default no category
  dob DATE NOT NULL,
  gender gender_enum,
  contact_no VARCHAR(15) NOT NULL,
  passport_no VARCHAR(20) NOT NULL,
  address_line1 varchar(80) NOT NULL,
  address_line2 varchar(80) NOT NULL,
  country VARCHAR(30) NOT NULL,
  city varchar(30) NOT NULL,
  display_image bytea,
  no_of_bookings int NOT NULL DEFAULT 0,
  joined TIMESTAMP DEFAULT NOW() NOT NULL,
  PRIMARY KEY (customer_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(category) REFERENCES Customer_Category(cat_name) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Traveller_Class (
  class_id SERIAL,
  class_name varchar(10) NOT NULL UNIQUE,
  PRIMARY KEY (class_id)
);

CREATE TABLE Location (
  location_id SERIAL,
  name varchar(50) NOT NULL,
  parent_id int,
  PRIMARY KEY (location_id),
  FOREIGN KEY(parent_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Airport (
  airport_code varchar(10),
  location_id int NOT NULL,
  image bytea,
  PRIMARY KEY (airport_code),
  FOREIGN KEY(location_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Aircraft_Model (
  model_id SERIAL,
  model_name varchar(30) NOT NULL,
  variant varchar(15) NOT NULL,
  manufacturer_name varchar(30) NOT NULL,
  economy_seat_capacity int NOT NULL,
  business_seat_capacity int NOT NULL,
  platinum_seat_capacity int NOT NULL,
  economy_seats_per_row int NOT NULL,
  business_seats_per_row int NOT NULL,
  platinum_seats_per_row int NOT NULL,
  max_load numeric(10,2), 
  fuel_capacity numeric(10,2),
  avg_airspeed int,
  PRIMARY KEY (model_id)
);

CREATE TABLE Aircraft_Seat (
  model_id int NOT NULL,
  seat_id varchar(10) NOT NULL,
  traveller_class_id int NOT NULL,
  PRIMARY KEY (model_id,seat_id),
  FOREIGN KEY(model_id) REFERENCES Aircraft_Model(model_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(traveller_class_id) REFERENCES Traveller_Class(class_id)  ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Aircraft_Instance (
  aircraft_id SERIAL,
  model_id int NOT NULL,
  airport_code varchar(10),
  aircraft_state aircraft_state_enum NOT NULL,
  PRIMARY KEY (aircraft_id),
  FOREIGN KEY(model_id) REFERENCES Aircraft_Model(model_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(airport_code) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Route (
  route_id SERIAL,
  origin varchar(10) NOT NULL,
  destination varchar(10) NOT NULL,
  duration interval NOT NULL,
  PRIMARY KEY (route_id),
  FOREIGN KEY(origin) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(destination) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Flight_Schedule (
  schedule_id SERIAL,
  route_id int NOT NULL ,
  aircraft_id int NOT NULL,
  departure_date date NOT NULL,
  departure_time_utc time NOT NULL,
  arrival_date date generated always as (get_arrival(route_id,get_timestamp(departure_date,departure_time_utc))::DATE) stored NOT NULL,
  arrival_time_utc time generated always as (get_arrival(route_id,get_timestamp(departure_date,departure_time_utc))::TIME) stored NOT NULL,
  actual_departed TIMESTAMP,
  actual_arrival TIMESTAMP,
  flight_state flight_state_enum NOT NULL DEFAULT 'Scheduled',
  PRIMARY KEY (schedule_id),
  FOREIGN KEY(route_id) REFERENCES Route(route_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(aircraft_id) REFERENCES Aircraft_Instance(aircraft_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Seat_Price (
  route_id int NOT NULL,
  traveler_class_id int NOT NULL,
  price numeric(10,2) NOT NULL,
  PRIMARY KEY(route_id,traveler_class_id),
  FOREIGN KEY(route_id) REFERENCES Route(route_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(traveler_class_id) REFERENCES Traveller_Class(class_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Seat_Booking (
  booking_id SERIAL,
  customer_id varchar(36) NOT NULL,
  schedule_id int NOT NULL,
  total_price numeric(10,2) NOT NULL,
  state booking_state_enum NOT NULL,
  date_of_booking DATE NOT NULL DEFAULT NOW()::DATE,
  PRIMARY KEY (booking_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(schedule_id) REFERENCES Flight_Schedule(schedule_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Passenger_Seat(
    booking_id int,
    model_id int,
    seat_id varchar(10),
    price numeric(10, 2), 
    name varchar(100) NOT NULL,
    passport_no varchar(20) NOT NULL,
    dob date NOT NULL,
    PRIMARY KEY (booking_id, model_id, seat_id),
    FOREIGN KEY(booking_id) REFERENCES Seat_Booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(model_id,seat_id) REFERENCES Aircraft_Seat(model_id,seat_id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE Customer_Review (
  review_id varchar(100),
  customer_id varchar(100) NOT NULL,
  review varchar(500),
  PRIMARY KEY (review_id),
  FOREIGN KEY(customer_id) REFERENCES Registered_Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Staff (
  emp_id char(6) PRIMARY KEY, --Bxxxxx
  category staff_category NOT NULL,
  password varchar(255) NOT NULL,
  first_name varchar(127) NOT NULL,
  last_name varchar(127) NOT NULL,
  contact_no varchar(15) NOT NULL,
  email varchar(70) NOT NULL UNIQUE,
  dob date NOT NULL,
  gender gender_enum NOT NULL,
  country varchar(30) NOT NULL,
  assigned_airport varchar(10),
  account_state staff_account_state NOT NULL DEFAULT 'unverified',
  FOREIGN KEY(assigned_airport) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Guest_Customer(
  customer_id uuid4,
  name VARCHAR(50) NOT NULL,
  address varchar(100) NOT NULL,
  dob DATE NOT NULL,
  gender gender_enum,
  passport_no VARCHAR(20) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(127) NOT NULL,
  PRIMARY KEY (customer_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

---------------------------------- SESSION TABLE SCHEMA ---------------------------------------------------------------------

CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE "session"
    ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-----------------------------------VIEWS SCHEMA ----------------------------------------
CREATE OR REPLACE VIEW temp_airport AS SELECT airport_code,getLocation(airport_code) AS name FROM  airport INNER JOIN location USING(location_id);

create view flight_info_passenger as
select booking_id,seat_id, name as passenger_name,passport_no as passenger_passport
from passenger_seat;

-- select * from flight_info_passenger;

create view booking_id_vs_category as
select booking_id,schedule_id,customer.customer_id,type
from seat_booking left outer join customer
using(customer_id);

-- select * from booking_id_vs_category;

create view passenger_details_only as
SELECT * from flight_info_passenger left outer join booking_id_vs_category using(booking_id);

-- select * from passenger_details_only;

create view booked_user_details as
SELECT customer_id, name as booked_name, email from guest_customer where customer_id in
(select customer_id from booking_id_vs_category where type='guest')
UNION
SELECT customer_id, CONCAT(first_name,' ',last_name)as booked_name, email from registered_customer where customer_id in
(select customer_id from booking_id_vs_category where type='registered');

-- select * from booked_user_details;
create view details_except_booked_person as
select customer_id,seat_id,passenger_name,passenger_passport,passenger_details_only.schedule_id
from booking_id_vs_category left outer join passenger_details_only 
using(customer_id);
-- select * from details_except_booked_person;

--------------------------------------   TRIGGERS  SCEHMA ------------------------------------------------------------------------------------



--------------------------------------- PROCEDURES SCHEMA---------------------------------------------------------------------------------------

-- Procedure to register customer
CREATE OR REPLACE PROCEDURE registerCustomer(
  val_email VARCHAR(127),
  val_password varchar(255),
  val_first_name VARCHAR(30),
  val_last_name VARCHAR(30),
  val_dob DATE,
  val_gender gender_enum,
  val_contact_no VARCHAR(15),
  val_passport_no VARCHAR(20),
  val_address_line1 varchar(30),
  val_address_line2 varchar(30),
  val_city varchar(30),
  val_country VARCHAR(30)        
)

LANGUAGE plpgsql    
AS $$
DECLARE
customer_id uuid4;
var_existing_email varchar(127) := (SELECT email from registered_customer where email = val_email);
BEGIN
    if (var_existing_email is null) then
        customer_id := generate_uuid4();
        INSERT INTO customer values (customer_id,'registered'); 
        INSERT INTO registered_customer(customer_id,email,password,first_name,last_name,dob,gender,contact_no,passport_no,address_line1,address_line2,city,country)
         values (customer_id,val_email,val_password,val_first_name,val_last_name,val_dob,val_gender,val_contact_no,val_passport_no,val_address_line1,val_address_line2,val_city,val_country);
    else
        RAISE EXCEPTION 'Email % is already registered', val_email;
    end if;
END;
$$;

-------------------------- Procedure to register staff member -------------------------------------
CREATE OR REPLACE PROCEDURE registerStaff(
  val_emp_id CHAR(6),
  val_category staff_category,
  val_password varchar(255),
  val_first_name VARCHAR(30),
  val_last_name VARCHAR(30),
  val_contact_no VARCHAR(15),
  val_email VARCHAR(127),
  val_dob DATE,
  val_gender gender_enum,
  val_country VARCHAR(30),
  val_airport VARCHAR(10)        
)

LANGUAGE plpgsql    
AS $$
DECLARE
val_existing_employee  char(6) := (SELECT emp_id from staff where emp_id = val_emp_id);
BEGIN
    if (val_existing_employee is null) then
        if (val_category='admin') then
            INSERT INTO staff(emp_id,category,password,first_name,last_name,contact_no,email,dob,gender,country,account_state)
            VALUES (val_emp_id,val_category,val_password,val_first_name,val_last_name,val_contact_no,val_email,val_dob,val_gender,val_country,'verified');
        elsif(val_category='general') then
            INSERT INTO staff(emp_id,category,password,first_name,last_name,contact_no,email,dob,gender,country,account_state,assigned_airport)
            VALUES (val_emp_id,val_category,val_password,val_first_name,val_last_name,val_contact_no,val_email,val_dob,val_gender,val_country,'unverified',val_airport);
        else
            INSERT INTO staff(emp_id,category,password,first_name,last_name,contact_no,email,dob,gender,country,account_state)
            VALUES (val_emp_id,val_category,val_password,val_first_name,val_last_name,val_contact_no,val_email,val_dob,val_gender,val_country,'unverified');
        end if;
    else
        RAISE EXCEPTION 'Emmployee ID % is already registered', val_emp_id;
    end if;
END;
$$;

----------Procedure to insert scheduled flights---------------
CREATE OR REPLACE PROCEDURE scheduleFlights(val_route_id int, val_aircraft_id int, val_departure_date date, val_departure_time_utc time)
LANGUAGE plpgsql    
AS $$ 
DECLARE
    rec RECORD;
    departure_timestamp timestamp;
    temp_departure_timestamp timestamp;
    temp_arrival_timestamp timestamp;
    maintainance_time interval='02:00:00'::interval;
    dest varchar(10);
    org varchar(10);
BEGIN
    departure_timestamp:=get_timestamp(val_departure_date,val_departure_time_utc);
    
	
	IF (departure_timestamp < CURRENT_TIMESTAMP at time zone 'utc'+INTERVAL '1 day') THEN
		RAISE EXCEPTION 'Departure time has to be after % UTC ',current_timestamp at time zone 'utc'+INTERVAL '1 day';
		RETURN;
	END IF;	

    SELECT * INTO rec FROM flight_schedule f WHERE aircraft_id = val_aircraft_id 
    ORDER BY get_timestamp(f.arrival_date,f.arrival_time_utc) DESC LIMIT 1;
	IF(rec is NULL) THEN
		INSERT INTO flight_schedule
            (route_id,aircraft_id,departure_date,departure_time_utc)
            VALUES(val_route_id,val_aircraft_id,val_departure_date,val_departure_time_utc); 
		RETURN;
	END IF;	
	
    temp_arrival_timestamp = get_timestamp(rec.arrival_date,rec.arrival_time_utc);

    IF (temp_arrival_timestamp + maintainance_time < departure_timestamp) THEN
        SELECT destination INTO dest FROM Route WHERE route_id=rec.route_id;
        SELECT origin INTO org FROM Route WHERE route_id=val_route_id;

        IF (dest=org) THEN	
            INSERT INTO flight_schedule
            (route_id,aircraft_id,departure_date,departure_time_utc)
            VALUES(val_route_id,val_aircraft_id,val_departure_date,val_departure_time_utc); 
        ELSE 
                RAISE EXCEPTION 'Aircraft is not in the required Airport';
        END IF;	
        
    ELSE
        RAISE EXCEPTION 'Aircraft schedule is overlapping';

    END IF;
	
	
END;
$$;


----------Procedure to delete scheduled flights---------------
CREATE OR REPLACE PROCEDURE deleteSchedule(val_schedule_id int)

LANGUAGE plpgsql    
AS $$ 
DECLARE
temp_schedule_id int;
BEGIN

SELECT schedule_id INTO  temp_schedule_id FROM flight_schedule WHERE aircraft_id=
(SELECT aircraft_id FROM flight_schedule WHERE schedule_id=val_schedule_id) 
	ORDER BY get_timestamp(flight_schedule.arrival_date,flight_schedule.arrival_time_utc) DESC LIMIT 1;

IF (temp_schedule_id = val_schedule_id) THEN
	DELETE FROM flight_schedule WHERE schedule_id=val_schedule_id;
ELSE
	 RAISE EXCEPTION 'Only the last flight can be deleted ';

END IF;
END;
$$;

------------Procedure to handle departure of a flight -------

CREATE OR REPLACE PROCEDURE handleFlightDeparture(val_schedule_id int)

LANGUAGE plpgsql    
AS $$ 
DECLARE
val_aircraft_id int;
val_scheduled_departue_date DATE;
val_scheduled_departure_time TIME;
val_aircraft_state aircraft_state_enum;
buffer_time interval='00:15:00'::interval;
BEGIN
	
    -- select the aircraft id  related to the flight
    SELECT aircraft_id,departure_date,departure_time_utc 
    INTO val_aircraft_id,val_scheduled_departue_date,val_scheduled_departure_time
    FROM Flight_Schedule WHERE schedule_id=val_schedule_id;

    -- select aircraft state to check whether its on Ground
    SELECT aircraft_state into val_aircraft_state FROM Aircraft_Instance WHERE aircraft_id=val_aircraft_id;

    IF(val_aircraft_state != 'On-Ground') THEN
        RAISE EXCEPTION 'Aircraft not yet On-Ground';
    END IF;
    -- update the aircraft state
    UPDATE Aircraft_Instance SET aircraft_state='In-Air' WHERE aircraft_id=val_aircraft_id;

    --update flight state
    IF(get_timestamp(val_scheduled_departue_date,val_scheduled_departure_time)+buffer_time >= NOW()) THEN
      UPDATE Flight_Schedule SET flight_state='Departed-On-Time',actual_departed=NOW() WHERE schedule_id=val_schedule_id;
    ELSE
      UPDATE Flight_Schedule SET flight_state='Delayed-Departure',actual_departed=NOW() WHERE schedule_id=val_schedule_id;
    END IF;
    RETURN;
END;
$$;



------------Procedure to handle delays/arrival of a flight -------


CREATE OR REPLACE PROCEDURE handleFlightArrival(val_schedule_id int)

LANGUAGE plpgsql    
AS $$ 
DECLARE
val_arrival_timestamp TIMESTAMP:= NOW();
val_arrival_date date := NOW()::DATE;
val_arrival_time_utc time := TO_CHAR(NOW()::TIME,'HH24:MI:SS')::TIME;
val_aircraft_id int;
val_flight_departue_date DATE;
val_flight_departure_time TIME;
ref_arrival_date DATE;
ref_arrival_time TIME;
temp_schedule_id int;
temp_departure_date DATE;
temp_departure_time TIME;
temp_arrival_date DATE;
temp_arrival_time TIME;
schedule_record RECORD;
maintainance_time interval='02:00:00'::interval;
calculated_delay_interval interval;
calculated_departure_timestamp timestamp;
calculated_arrival_timestamp timestamp;


BEGIN
	
    -- select the aircraft id  related to the flight
    SELECT aircraft_id,departure_date,departure_time_utc 
    INTO val_aircraft_id,val_flight_departue_date,val_flight_departure_time
    FROM Flight_Schedule WHERE schedule_id=val_schedule_id;

    -- update that flight with the actual arrival time
    UPDATE flight_schedule SET actual_arrival= val_arrival_timestamp,flight_state='Landed'
    WHERE schedule_id=val_schedule_id;

    UPDATE Aircraft_Instance SET aircraft_state='On-Ground' WHERE aircraft_id=val_aircraft_id;


    --Init refrenceing arrival and departure times to the value of the flight in consideration
    ref_arrival_date = val_arrival_date ;
    ref_arrival_time = val_arrival_time_utc;


    --select all the schedule_ids the specific aircraft 
	--which have departure times after the departure time of the arrived flight
	--ordered them by departure time
	FOR schedule_record IN SELECT * FROM Flight_Schedule 
    WHERE aircraft_id = val_aircraft_id
    AND get_timestamp(departure_date,departure_time_utc)>get_timestamp(val_flight_departue_date,val_flight_departure_time)
    ORDER BY departure_date ASC, departure_time_utc ASC
        LOOP
            --SELECT schedule_id,departure_date,departure_time _utc,arrival_date,arrival_time _utc 
            --INTO temp_schedule_id,temp_departure_date,temp_departure_time,temp_arrival_date,temp_arrival_time FROM schedule_record;
            temp_schedule_id = schedule_record.schedule_id;
            temp_departure_date = schedule_record.departure_date;
            temp_departure_time = schedule_record.departure_time_utc;
            temp_arrival_date = schedule_record.arrival_date;
            temp_arrival_time = schedule_record.arrival_time_utc; 

            IF (get_timestamp(ref_arrival_date,ref_arrival_time)+maintainance_time >= get_timestamp(temp_departure_date,temp_departure_time)) THEN

                calculated_delay_interval = (get_timestamp(ref_arrival_date,ref_arrival_time)+maintainance_time - get_timestamp(temp_departure_date,temp_departure_time))::interval;
                calculated_departure_timestamp = get_timestamp(temp_departure_date,temp_departure_time) + calculated_delay_interval;
                calculated_arrival_timestamp = get_timestamp(temp_arrival_date,temp_arrival_time) + calculated_delay_interval;

                UPDATE Flight_schedule 
                SET departure_date = calculated_departure_timestamp::DATE,
                departure_time_utc = calculated_departure_timestamp::TIME
                WHERE schedule_id = temp_schedule_id;

                ref_arrival_date = calculated_arrival_timestamp::DATE;
                ref_arrival_time = calculated_arrival_timestamp::TIME;

            ELSE
                EXIT;
            END IF;

        END LOOP;

		
		return;

END;
$$;

---------------------PROCEDURE FOR ADDING SEATS---------------------------
CREATE OR REPLACE PROCEDURE insert_seats()
LANGUAGE plpgsql
AS $$
DECLARE
	   temp_model_id int;
	   model_count int;
       current_seat int;
       row_num int;
       col char;
	   platinum int;
	   business int;
	   economy int;
       economy_row int;
       business_row int;
       platinum_row int;
       cols char[] DEFAULT array['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
       columns_economy char[];
       columns_business char[];
       columns_platinum char[];
BEGIN
	SELECT COUNT(model_id) INTO model_count FROM aircraft_model;
	temp_model_id = 1;

	while temp_model_id <= model_count loop
		SELECT economy_seat_capacity, business_seat_capacity, platinum_seat_capacity, economy_seats_per_row, business_seats_per_row, platinum_seats_per_row INTO economy, business, platinum, economy_row, business_row, platinum_row
			FROM aircraft_model WHERE model_id=temp_model_id;

        columns_platinum = cols[: platinum_row];

		current_seat = 1;
		row_num = 1;
		while current_seat <= platinum loop
            foreach col in array columns_platinum loop
                    INSERT INTO aircraft_seat VALUES(temp_model_id, CONCAT(row_num, col), 1);
                    current_seat = current_seat + 1;
            end loop;
			row_num = row_num + 1;
		end loop;

        columns_business = cols[: business_row];
		current_seat = 1;

        while current_seat <= business loop
                foreach col in array columns_business loop
                        INSERT INTO aircraft_seat VALUES(temp_model_id, CONCAT(row_num, col), 2);
                        current_seat = current_seat + 1;
                end loop;
                row_num = row_num + 1;
        end loop;
        columns_economy = cols[: economy_row];
        current_seat = 1;

        while current_seat <= economy loop
                foreach col in array columns_economy loop
                        INSERT INTO aircraft_seat VALUES(temp_model_id, CONCAT(row_num, col), 3);
                        current_seat = current_seat + 1;
                end loop;
                row_num = row_num + 1;
        end loop;
        temp_model_id = temp_model_id + 1;
	end loop;

END;
$$;


---------------------PROCEDURE FOR ADDING SEAT PRICES---------------------------
CREATE OR REPLACE PROCEDURE insert_route_price(int,numeric,numeric,numeric)
LANGUAGE plpgsql
AS $$

BEGIN
	INSERT INTO seat_price VALUES ($1,1,$2);
	INSERT INTO seat_price VALUES ($1,2,$3);
	INSERT INTO seat_price VALUES ($1,3,$4);

END;
$$;


---------------------------------------Privilages - only for dev ------------------------------------------------------------------------




GRANT EXECUTE ON FUNCTION public.generate_uuid4() TO database_app;

GRANT EXECUTE ON FUNCTION public.get_age(birthday date) TO database_app;

GRANT EXECUTE ON FUNCTION public.get_arrival(val_route_id integer, val_departure_datetime timestamp without time zone) TO database_app;

GRANT EXECUTE ON FUNCTION public.get_timestamp(val_date date, val_time time without time zone) TO database_app;

GRANT EXECUTE ON PROCEDURE public.deleteschedule(val_schedule_id integer) TO database_app;

GRANT EXECUTE ON PROCEDURE public.handleflightarrival(val_schedule_id integer) TO database_app;

GRANT EXECUTE ON PROCEDURE public.handleflightdeparture(val_schedule_id integer) TO database_app;

GRANT EXECUTE ON PROCEDURE public.registercustomer(val_email character varying, val_password character varying, val_first_name character varying, val_last_name character varying, val_dob date, val_gender gender_enum, val_contact_no character varying, val_passport_no character varying, val_address_line1 character varying, val_address_line2 character varying, val_city character varying, val_country character varying) TO database_app;

GRANT EXECUTE ON PROCEDURE public.registerstaff(val_emp_id character, val_category staff_category, val_password character varying, val_first_name character varying, val_last_name character varying, val_contact_no character varying, val_email character varying, val_dob date, val_gender gender_enum, val_country character varying, val_airport character varying) TO database_app;

GRANT EXECUTE ON PROCEDURE public.scheduleflights(val_route_id integer, val_aircraft_id integer, val_departure_date date, val_departure_time_utc time without time zone) TO database_app;


--GRANT EXECUTE ON FUNCTION public.afterseatbookinginsert() TO database_app;
--
--GRANT EXECUTE ON FUNCTION public.beforeseatbookingcancellation() TO database_app;

GRANT ALL ON SEQUENCE public.aircraft_instance_aircraft_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.aircraft_model_model_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.flight_schedule_schedule_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.location_location_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.route_route_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.seat_booking_booking_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.traveller_class_class_id_seq TO database_app;

GRANT ALL ON TABLE public.aircraft_instance TO database_app;

GRANT ALL ON TABLE public.aircraft_model TO database_app;

GRANT ALL ON TABLE public.aircraft_seat TO database_app;

GRANT ALL ON TABLE public.airport TO database_app;

GRANT ALL ON TABLE public.customer TO database_app;

GRANT ALL ON TABLE public.customer_category TO database_app;

GRANT ALL ON TABLE public.customer_review TO database_app;

GRANT ALL ON TABLE public.flight_schedule TO database_app;

GRANT ALL ON TABLE public.location TO database_app;

GRANT ALL ON TABLE public.organizational_info TO database_app;

GRANT ALL ON TABLE public.registered_customer TO database_app;

GRANT ALL ON TABLE public.route TO database_app;

GRANT ALL ON TABLE public.seat_booking TO database_app;

GRANT ALL ON TABLE public.seat_price TO database_app;

GRANT ALL ON TABLE public.passenger_seat TO database_app;

GRANT ALL ON TABLE public.session TO database_app;

GRANT ALL ON TABLE public.staff TO database_app;

GRANT ALL ON TABLE public.traveller_class TO database_app;

GRANT ALL ON TABLE public.temp_airport TO database_app;
                                                                                                                                
GRANT ALL ON TABLE public.guest_customer TO database_app;

GRANT SELECT ON booking_id_vs_category TO database_app;

GRANT SELECT ON passenger_details_only TO database_app;

GRANT SELECT ON flight_info_passenger TO database_app;

GRANT SELECT ON booked_user_details TO database_app;

GRANT SELECT ON details_except_booked_person TO database_app;