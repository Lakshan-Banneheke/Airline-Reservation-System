
----------------------------------  FUNCTIONS  ------------------------------------

CREATE OR REPLACE FUNCTION get_age( birthday date )
RETURNS int
AS $CODE$
BEGIN
    RETURN date_part('year', age(birthday))::int;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;


---------------------------------     TRIGGERS   ---------------------------------------

-- no of bookings trigger --

-- increaseNumBookings(customer_id)
CREATE OR REPLACE PROCEDURE  increaseNumBookings(uuid4)
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
CREATE OR REPLACE FUNCTION afterSeat bookingInsert()
RETURNS TRIGGER AS $$
BEGIN
    raise notice 'Trigger on Seat_Booking % (Increasing number of bookings)', NEW.customer_id;
    call increaseNumBookings(NEW.customer_id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increase booking count of customer
CREATE TRIGGER bookingInsertTrigger
AFTER INSERT
ON Seat_Booking 
FOR EACH ROW EXECUTE PROCEDURE bookingInsert();


-- decreaseNumBookings(customer_id)
CREATE OR REPLACE PROCEDURE  decreaseNumBookings(uuid4)
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
     UPDATE Profile SET no_of_bookings = no_of_bookings - 1 WHERE customer_id = $1;
END;
$$;

-- Trigger bookingDelete statements
CREATE OR REPLACE FUNCTION afterSeat bookingDelete()
RETURNS TRIGGER AS $$
BEGIN
    raise notice 'Trigger on Seat_Booking % (Decreasing number of bookings)', NEW.customer_id;
    call decreaseNumBookings(NEW.customer_id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -- Trigger to decrease booking count of customer
CREATE TRIGGER bookingInsertTrigger
BEFORE DELETE
ON Seat_Booking 
FOR EACH ROW EXECUTE PROCEDURE bookingDelete();

----------------------------------  TABLE SCHEMA --------------------------------------

CREATE TABLE "Organizational_Info" (
  "airline_name" varchar(30),
  "airline_hotline" varchar(20),
  "airline_email" varchar(50),
  "airline_address" varchar(100),
  "airline_account_no" varchar(30),
  PRIMARY KEY ("airline_name")
);


CREATE TABLE "Customer_Category" (
  "cat_id" VARCHAR(36),
  "cat_name" VARCHAR(20),
  "discount_percentage" NUMERIC(4,2),
  "min_bookings" SMALLINT,
  PRIMARY KEY ("cat_id")
);

CREATE TABLE "Customer" (
  "customer_id" VARCHAR(36),
  "full_name" VARCHAR(30),
  "dob" DATE,
  "age" INT GENERATED ALWAYS AS (get_age(dob)) STORED,
  "gender" SMALLINT,
  "email" VARCHAR(30),
  "contact_no" VARCHAR(15),
  "passport_no" VARCHAR(20),
  "country" VARCHAR(30),
  "is_registered" BOOL,
  PRIMARY KEY ("customer_id")
);

CREATE TABLE "Profile" (
  "customer_id" varchar(36),
  "password" varchar(70),
  "photo" blob,
  "category" varchar(10),
  "address" varchar(30),
  "no_of_bookings" int,
  PRIMARY KEY ("customer_id"),
  FOREIGN KEY("customer_id") REFERENCES "Customer"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;
);



---------------------------------- SESSION TABLE SCHEMA -----------------------------------

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
