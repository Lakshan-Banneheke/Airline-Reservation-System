DROP TRIGGER IF EXISTS afterbookingInsertTrigger ON Seat_Booking;
DROP TRIGGER IF EXISTS beforebookingCancellationTrigger ON Seat_Booking;

DROP PROCEDURE IF EXISTS registerCustomer;
DROP PROCEDURE IF EXISTS increaseNumBookings;
DROP PROCEDURE IF EXISTS decreaseNumBookings;

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
DROP TABLE IF EXISTS Seat_Reservation CASCADE;
DROP TABLE IF EXISTS Customer_Review CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Staff_Category CASCADE;
DROP TABLE IF EXISTS session CASCADE;

DROP TYPE IF EXISTS  booking_state_enum;
DROP TYPE IF EXISTS  flight_state_enum;
DROP TYPE IF EXISTS  aircraft_state_enum;
DROP TYPE IF EXISTS  gender_enum;
DROP TYPE IF EXISTS  customer_state_enum;

---------------------------------- ENUMS SCHEMA ------------------------------------

CREATE TYPE flight_state_enum AS ENUM(
'Scheduled',
'Delayed',
'Departed',
'In-Air',
'Arrived',
'Cancelled');

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
------------------------------------DOMAIN SCHEMA ---------------------------------------

CREATE DOMAIN UUID4 AS char(36)
CHECK (VALUE ~ '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}');


----------------------------------  FUNCTION SCHEMA  ------------------------------------

--Function to create UUID for tables
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

CREATE OR REPLACE FUNCTION get_age( birthday date )
RETURNS int
AS $CODE$
BEGIN
    RETURN date_part('year', age(birthday))::int;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;


-- CREATE OR REPLACE FUNCTION get_seat_price()
-- CREATE OR REPLACE FUNCTION get_price()

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
  cat_name VARCHAR(30),
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
  category varchar(30), --Default no category
  dob DATE NOT NULL,
  age INT GENERATED ALWAYS AS (get_age(dob)) STORED NOT NULL,
  gender gender_enum,
  contact_no VARCHAR(15) NOT NULL,
  passport_no VARCHAR(20) NOT NULL,
  address_line1 varchar(30) NOT NULL,
  address_line2 varchar(30) NOT NULL,
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
  duration time NOT NULL,
  PRIMARY KEY (route_id),
  FOREIGN KEY(origin) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(destination) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Flight_Schedule (
  schedule_id varchar(24),
  route_id int,
  aircraft_id int,
  date date,
  departure_time_gmt timestamp,
  arrival_time_gmt timestamp,
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
  booking_id varchar(24),
  customer_id varchar(36),
  schedule_id varchar(24),
  --price numeric GENERATED ALWAYS AS (get_price()) STORED, -- price function to be implemented
  total_price numeric(10,2),
  state booking_state_enum,
  PRIMARY KEY (booking_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(schedule_id) REFERENCES Flight_Schedule(schedule_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Seat_Reservation(
    booking_id varchar(24),
    model_id int,
    seat_id varchar(10),
    --price numeric GENERATED ALWAYS AS (get__seat_price()) STORED, -- price function to be implemented
    price numeric(10,2),
    PRIMARY KEY (booking_id, model_id, seat_id),
    FOREIGN KEY(booking_id) REFERENCES Seat_Booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(model_id,seat_id) REFERENCES Aircraft_Seat(model_id,seat_id) ON DELETE CASCADE ON UPDATE CASCADE
);

--Table to keep guest info about bookings if done by a guest

CREATE TABLE Customer_Review (
  review_id varchar(100),
  customer_id varchar(100) NOT NULL,
  review varchar(500),
  PRIMARY KEY (review_id),
  FOREIGN KEY(customer_id) REFERENCES Registered_Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Staff_Category (
  cat_id SERIAL,
  cat_name varchar(20) NOT NULL,
  PRIMARY KEY (cat_id)
);


CREATE TABLE Staff (
  emp_id uuid4 DEFAULT generate_uuid4 (),
  category int NOT NULL,
  password varchar(70) NOT NULL,
  name varchar(50) NOT NULL,
  contact_no varchar(15) NOT NULL,
  email varchar(70) NOT NULL UNIQUE,
  dob date NOT NULL,
  gender gender_enum NOT NULL,
  country varchar(30) NOT NULL,
  PRIMARY KEY (emp_id),
  FOREIGN KEY(category) REFERENCES Staff_Category(cat_id) ON DELETE CASCADE ON UPDATE CASCADE
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

--------------------------------     TRIGGERS  SCEHMA ------------------------------------------------------------------------------------



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



---------------------------------------Privilages - only for dev ------------------------------------------------------------------------

GRANT EXECUTE ON FUNCTION public.generate_uuid4() TO database_app;

GRANT EXECUTE ON FUNCTION public.get_age(birthday date) TO database_app;

GRANT EXECUTE ON PROCEDURE public.registercustomer(email character varying, password character varying, first_name character varying, last_name character varying,dob date, gender gender_enum, contact_no character varying, passport_no character varying, address_line1 character varying, address_line2 character varying, country character varying, city character varying) TO database_app;

GRANT EXECUTE ON FUNCTION public.afterseatbookinginsert() TO database_app;

GRANT EXECUTE ON FUNCTION public.beforeseatbookingcancellation() TO database_app;

GRANT ALL ON SEQUENCE public.aircraft_instance_aircraft_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.aircraft_model_model_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.location_location_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.route_route_id_seq TO database_app;

GRANT ALL ON SEQUENCE public.staff_category_cat_id_seq TO database_app;

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

GRANT ALL ON TABLE public.seat_reservation TO database_app;

GRANT ALL ON TABLE public.session TO database_app;

GRANT ALL ON TABLE public.staff TO database_app;

GRANT ALL ON TABLE public.staff_category TO database_app;

GRANT ALL ON TABLE public.traveller_class TO database_app;

