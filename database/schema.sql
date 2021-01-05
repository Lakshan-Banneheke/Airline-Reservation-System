DROP TRIGGER IF EXISTS afterbookingInsertTrigger ON Seat_Booking;
DROP TRIGGER IF EXISTS beforebookingCancellationTrigger ON Seat_Booking;

DROP PROCEDURE IF EXISTS increaseNumBookings;
DROP PROCEDURE IF EXISTS decreaseNumBookings;

DROP TABLE IF EXISTS Organizational_Info CASCADE;
DROP TABLE IF EXISTS Customer_Category CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
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
DROP TABLE IF EXISTS Customer_Review CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Staff_Category CASCADE;
DROP TABLE IF EXISTS Seat_Price CASCADE;
DROP TABLE IF EXISTS session CASCADE;


---------------------------------- ENUMS SCHEMA ------------------------------------

CREATE TYPE State_enum AS ENUM(
'Scheduled',
'Delayed',
'Departed',
'In-Air',
'Landed',
'Arrived',
'Cancelled');  



----------------------------------  FUNCTION SCHEMA  ------------------------------------

CREATE OR REPLACE FUNCTION get_age( birthday date )
RETURNS int
AS $CODE$
BEGIN
    RETURN date_part('year', age(birthday))::int;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;


-- CREATE OR REPLACE FUNCTION get_price()


----------------------------------  TABLE SCHEMA --------------------------------------

CREATE TABLE Organizational_Info (
  airline_name  varchar(30),
  airline_hotline varchar(20),
  airline_email varchar(50),
  airline_address varchar(100),
  airline_account_no varchar(30),
  PRIMARY KEY (airline_name)
);


CREATE TABLE Customer_Category (
  cat_id VARCHAR(36),
  cat_name VARCHAR(20),
  discount_percentage NUMERIC(4,2),
  min_bookings SMALLINT,
  PRIMARY KEY (cat_id)
);

CREATE TABLE Customer (
  customer_id VARCHAR(36),
  full_name VARCHAR(30),
  dob DATE,
  age INT GENERATED ALWAYS AS (get_age(dob)) STORED,
  gender SMALLINT,
  email VARCHAR(30),
  contact_no VARCHAR(15),
  passport_no VARCHAR(20),
  country VARCHAR(30),
  is_registered BOOL,
  PRIMARY KEY (customer_id)
);

CREATE TABLE Profile (
  customer_id varchar(36),
  password varchar(70),
  display_image bytea,
  category varchar(10),
  address varchar(30),
  no_of_bookings int,
  PRIMARY KEY (customer_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(category) REFERENCES Customer_Category(cat_id) ON DELETE CASCADE ON UPDATE CASCADE
);

--new--delete this
CREATE TABLE Traveller_Class (
  class_id varchar(10),
  class_name varchar(10),
  PRIMARY KEY (class_id)
);

CREATE TABLE Location (
  location_id varchar(36),
  description varchar(30),
  parent_id varchar(36),
  PRIMARY KEY (location_id),
  FOREIGN KEY(parent_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Airport (
  airport_code varchar(10),
  location_id varchar(36),
  image bytea,
  PRIMARY KEY (airport_code),
  FOREIGN KEY(location_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Aircraft_Model (
  model_id varchar(12),
  model_name varchar(30),
  manufacturer_name varchar(30),
  economy_seat_capacity int,
  business_seat_capacity int,
  platinum_seat_capacity int,
  max_load numeric(10,2),
  fuel_capacity numeric(10,2),
  avg_airspeed int,
  PRIMARY KEY (model_id)
);

CREATE TABLE Aircraft_Seat (
  model_id varchar(10) NOT NULL,
  seat_id varchar(10) NOT NULL,
  traveller_class_id varchar(10),
  PRIMARY KEY (model_id,seat_id),
  FOREIGN KEY(model_id) REFERENCES Aircraft_Model(model_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(traveller_class_id) REFERENCES Traveller_Class(class_id)  ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Aircraft_Instance (
  aircraft_id varchar(5),
  model_id varchar(12),
  airport_code varchar(10),
  state State_enum,
  PRIMARY KEY (aircraft_id),
  FOREIGN KEY(model_id) REFERENCES Aircraft_Model(model_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(airport_code) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE
);
----shashini start--delete this
CREATE TABLE Route (
  route_id varchar(10),
  origin varchar(10),
  destination varchar(10),
  time time,
  PRIMARY KEY (route_id),
  FOREIGN KEY(origin) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(destination) REFERENCES Airport(airport_code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Flight_Schedule (
  flight_id varchar(24),
  route_id varchar(10),
  aircraft_id varchar(5),
  date date,
  departure_time_gmt timestamp,
  arrival_time_gmt timestamp,
  PRIMARY KEY (flight_id),
  FOREIGN KEY(route_id) REFERENCES Route(route_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(aircraft_id) REFERENCES Aircraft_Instance(aircraft_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Seat_Price (
  route_id varchar(10) NOT NULL,
  traveler_class_id varchar(10) NOT NULL,
  Price numeric(10,2),
  PRIMARY KEY(route_id,traveler_class_id),
  FOREIGN KEY(route_id) REFERENCES Route(route_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(traveler_class_id) REFERENCES Traveller_Class(class_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Seat_Booking (
  booking_id varchar(24),
  customer_id varchar(36),
  flight_id varchar(24),
  model_id varchar(10),
  seat_id varchar(10),
  --price numeric GENERATED ALWAYS AS (get_price()) STORED, -- price function to be implemented
  price numeric(4,2),
  PRIMARY KEY (booking_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(flight_id) REFERENCES Flight_Schedule(flight_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(model_id,seat_id) REFERENCES Aircraft_Seat(model_id,seat_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Customer_Review (
  review_id varchar(100),
  customer_id varchar(100),
  review varchar(500),
  stars int,
  PRIMARY KEY (review_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Staff_Category (
  cat_id varchar(10),
  cat_name varchar(20),
  PRIMARY KEY (cat_id)
);

CREATE TABLE Staff (
  emp_id varchar(36),
  category varchar(10),
  password varchar(70),
  name varchar(50),
  contact_no varchar(15),
  email varchar(20),
  dob date,
  gender varchar(10),
  country varchar(30),
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

--------------------------------     TRIGGERS   ------------------------------------------------------------------

-- no of bookings trigger --

-- increaseNumBookings(customer_id)
CREATE OR REPLACE PROCEDURE  increaseNumBookings(uuid)
LANGUAGE plpgsql
AS $$
DECLARE
       registered bool;
BEGIN
    -- ignore if customer_id is null
    if $1 is null then return;
    end if;
    -- get if customer is registered of the category
    SELECT is_registered INTO registered FROM Customer  WHERE customer_id=$1;
	-- ignore if registered is false
	if registered is false then return;
	end if;
	-- inxcrease no of bookings of customer by 1
     UPDATE Profile SET no_of_bookings = no_of_bookings + 1 WHERE customer_id = $1;
END;
$$;

-- Trigger bookingInsert statements
CREATE OR REPLACE FUNCTION afterSeatbookingInsert()
RETURNS TRIGGER AS $$
BEGIN
    raise notice 'Trigger on Seat_Booking % (Increasing number of bookings)', NEW.customer_id;
    call increaseNumBookings(NEW.customer_id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increase booking count of customer
CREATE TRIGGER afterbookingInsertTrigger
AFTER INSERT
ON Seat_Booking
FOR EACH ROW EXECUTE PROCEDURE afterSeatbookingInsert();

------------------------------------------------------------------------------------------------------------------------
-- decreaseNumBookings(customer_id)
CREATE OR REPLACE PROCEDURE  decreaseNumBookings(uuid)
LANGUAGE plpgsql
AS $$
DECLARE
       registered bool;
BEGIN
    -- ignore if customer_id is null
    if $1 is null then return;
    end if;
    -- get if customer is registered of the category
    SELECT is_registered INTO registered FROM Customer  WHERE customer_id=$1;
	-- ignore if registered is false
	if registered is false then return;
	end if;
	-- increase no of bookings of customer by 1
     UPDATE Profile SET no_of_bookings = no_of_bookings - 1 WHERE customer_id = $1;
END;
$$;

-- Trigger bookingDelete statements
CREATE OR REPLACE FUNCTION beforeSeatBookingCancellation()
RETURNS TRIGGER AS $$
BEGIN
    raise notice 'Trigger on Seat_Booking % (Decreasing number of bookings)', NEW.customer_id;
    call decreaseNumBookings(NEW.customer_id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger to decrease booking count of customer
CREATE TRIGGER beforebookingCancellationTrigger
BEFORE DELETE
ON Seat_Booking
FOR EACH ROW EXECUTE PROCEDURE beforeSeatbookingCancellation();

------------------------------------------------------------------------------------------------------------------------
