INSERT INTO organizational_info VALUES ('B Airways','+61396906345','info@bairways.com','314, 3rd Floor, Gotham Towers, Melbourne, Victoria, Australia','2229993949');


--------------------- INSERTING STAFF CATOGARIES-----------------------
-- INSERT INTO staff_category (cat_name) VALUES ('Admin');
-- INSERT INTO staff_category (cat_name) VALUES ('Manager');
-- INSERT INTO staff_category (cat_name) VALUES ('Airline Staff');

--------------------- INSERTING STAFF  MEMBERS-----------------------
----Password generated from 'https://bcrypt-generator.com/' with 10 rounds. All passwords are '12345'
-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(1,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Avishka Shamendra','+61777888888','avishkas@bairways.com','1998-04-09','Male','Australia');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(2,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Lakshan Banneheke','+61777889999','lakshanb@bairways.com','1998-03-02','Male','Australia');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(2,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Dhaura Pathirana','+33777889988','dhaura@bairways.com','1998-10-01','Male','France');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(3,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Thushani Jayasekera','+61765889922','thushanijb@bairways.com','1998-06-07','Female','Australia');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(3,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Shashini Wimalarathne','+49766889999','shashiniw@bairways.com','1998-08-14','Female','Germany');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(3,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Pasindu Abeysinghe','+01747889999','pasindu@bairways.com','1998-08-15','Male','USA');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(3,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Gayangi Senevirathne','+64889889999','gayangis@bairways.com','1998-10-02','Female','New Zealand');

-- INSERT INTO staff(category,password,name,contact_no,email,dob,gender,country)
-- VALUES(3,'$2y$10$OcewsZinyIdxnKtVEdo3A.9I7z0OblgX.MG5YIR4GPq7Ia/z/Vp1a','Binoy Peries','+61788889779','binoyp@bairways.com','1998-04-15','Male','Australia');

---------------------INSERTING LOCATIONS---------------------------
INSERT INTO location(name) VALUES ('Sri Lanka');
INSERT INTO location(name, parent_id) VALUES ('Hambantota',1);
INSERT INTO location(name, parent_id) VALUES ('Colombo',1);

INSERT INTO location(name) VALUES ('Indonesia');
INSERT INTO location(name, parent_id) VALUES ('Jakarta',4);
INSERT INTO location(name, parent_id) VALUES ('Bali',4);


INSERT INTO location(name) VALUES ('India');

INSERT INTO location(name, parent_id) VALUES ('Delhi',7);
INSERT INTO location(name, parent_id) VALUES ('New Delhi',8);

INSERT INTO location(name, parent_id) VALUES ('Maharashtra',7);
INSERT INTO location(name, parent_id) VALUES ('Mumbai',10);

INSERT INTO location(name, parent_id) VALUES ('Tamil Nadu',7);
INSERT INTO location(name, parent_id) VALUES ('Chennai',12);

INSERT INTO location(name) VALUES ('Thailand');
INSERT INTO location(name, parent_id) VALUES ('Bangkok',14);

INSERT INTO location(name) VALUES ('Singapore');
INSERT INTO location(name, parent_id) VALUES ('Changi',16);

---------------------INSERTING AIRPORTS---------------------------
INSERT INTO airport(airport_code,location_id) VALUES('BIA',3);
INSERT INTO airport(airport_code,location_id) VALUES('HRI',2);

INSERT INTO airport(airport_code,location_id) VALUES('CGK',5);
INSERT INTO airport(airport_code,location_id) VALUES('DPS',6);

INSERT INTO airport(airport_code,location_id) VALUES('DEL',9);
INSERT INTO airport(airport_code,location_id) VALUES('BOM',11);
INSERT INTO airport(airport_code,location_id) VALUES('MAA',13);

INSERT INTO airport(airport_code,location_id) VALUES('BKK',15);
INSERT INTO airport(airport_code,location_id) VALUES('DMK',15);

INSERT INTO airport(airport_code,location_id) VALUES('SIN',17);

---------------------INSERTING AIRCRAFT MODELS---------------------------

--max_load in kg -- speed in kmph -- fuel_capacity in litres--
INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,max_load,fuel_capacity,avg_airspeed)
VALUES('Boeing 737','MAX 10','Boeing Commercial Airplanes',150,25,10,88300,25941,838);

INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,max_load,fuel_capacity,avg_airspeed)
VALUES('Boeing 757','300','Boeing Commercial Airplanes',200,30,13,123830,43400,918);

INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,max_load,fuel_capacity,avg_airspeed)
VALUES('Airbus A380','800','Airbus',505,50,20,575000,323546,903);

---------------------INSERTING AIRCRAFT INSTANCES---------------------------
INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (1,'BIA','On-Ground');
INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (1,'DPS','On-Ground');
INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (1,'HRI','On-Ground');

INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (2,'BIA','On-Ground');
INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (2,'DEL','On-Ground');
INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (2,'BOM','On-Ground');
INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (2,'MAA','On-Ground');

INSERT INTO aircraft_instance (model_id,airport_code,aircraft_state) VALUES (3,'BIA','On-Ground');

---------------------INSERTING ROUTES-----------------------------

INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'BKK', '03:20');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'CGK', '04:45');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'DPS', '07:15');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'DEL', '03:05');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'BOM', '02:25');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'MAA', '01:15');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'DMK', '03:50');
INSERT INTO Route(origin, destination, duration) VALUES ('BIA', 'SIN', '03:50');
INSERT INTO Route(origin, destination, duration) VALUES ('HRI', 'SIN', '03:40');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'BIA', '03:40');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'HRI', '03:30');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'CGK', '01:40');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'DPS', '02:20');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'DEL', '05:40');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'BOM', '05:05');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'MAA', '03:55');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'BKK', '02:15');
INSERT INTO Route(origin, destination, duration) VALUES ('SIN', 'DMK', '02:20');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'BIA', '04:35');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'DEL', '08:50');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'BOM', '08:10');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'MAA', '07:05');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'BKK', '03:15');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'DMK', '03:40');
INSERT INTO Route(origin, destination, duration) VALUES ('CGK', 'SIN', '01:40');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'BIA', '07:50');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'DEL', '09:55');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'BOM', '09:00');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'MAA', '08:40');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'BKK', '04:10');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'DMK', '04:15');
INSERT INTO Route(origin, destination, duration) VALUES ('DPS', 'SIN', '02:25');
INSERT INTO Route(origin, destination, duration) VALUES ('DEL', 'CGK', '08:20');
INSERT INTO Route(origin, destination, duration) VALUES ('DEL', 'DPS', '08:20');
INSERT INTO Route(origin, destination, duration) VALUES ('DEL', 'BIA', '03:25');
INSERT INTO Route(origin, destination, duration) VALUES ('DEL', 'BKK', '03:45');
INSERT INTO Route(origin, destination, duration) VALUES ('DEL', 'DMK', '03:45');
INSERT INTO Route(origin, destination, duration) VALUES ('DEL', 'SIN', '05:30');
INSERT INTO Route(origin, destination, duration) VALUES ('BOM', 'CGK', '06:15');
INSERT INTO Route(origin, destination, duration) VALUES ('BOM', 'DPS', '09:00');
INSERT INTO Route(origin, destination, duration) VALUES ('BOM', 'BIA', '02:25');
INSERT INTO Route(origin, destination, duration) VALUES ('BOM', 'BKK', '04:05');
INSERT INTO Route(origin, destination, duration) VALUES ('BOM', 'DMK', '04:00');
INSERT INTO Route(origin, destination, duration) VALUES ('BOM', 'SIN', '05:14');
INSERT INTO Route(origin, destination, duration) VALUES ('MAA', 'CGK', '05:00');
INSERT INTO Route(origin, destination, duration) VALUES ('MAA', 'DPS', '06:30');
INSERT INTO Route(origin, destination, duration) VALUES ('MAA', 'BIA', '01:15');
INSERT INTO Route(origin, destination, duration) VALUES ('MAA', 'BKK', '03:20');
INSERT INTO Route(origin, destination, duration) VALUES ('MAA', 'DMK', '03:30');
INSERT INTO Route(origin, destination, duration) VALUES ('MAA', 'SIN', '04:10');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'CGK', '03:20');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'DPS', '04:10');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'BIA', '03:25');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'DEL', '04:10');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'BOM', '04:50');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'MAA', '03:20');
INSERT INTO Route(origin, destination, duration) VALUES ('BKK', 'SIN', '02:15');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'CGK', '03:20');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'DPS', '04:10');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'BIA', '03:20');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'DEL', '04:00');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'BOM', '04:00');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'MAA', '03:25');
INSERT INTO Route(origin, destination, duration) VALUES ('DMK', 'SIN', '02:20');

---------------------INSERTING TRAVELLER CLASS---------------------------
INSERT INTO traveller_class(class_name) VALUES ('Platinum');
INSERT INTO traveller_class(class_name) VALUES ('Business');
INSERT INTO traveller_class(class_name) VALUES ('Economy');

---------------------INSERTING ROUTES-----------------------------


---------------------PROCEDURE FOR ADDING SEATS---------------------------
CREATE OR REPLACE PROCEDURE insert_seats()
LANGUAGE plpgsql
AS $$
DECLARE
	   temp_model_id int;
	   model_count int;
       current_seat int;
	   platinum int;
	   business int;
	   economy int;
BEGIN

	SELECT COUNT(model_id) INTO model_count FROM aircraft_model;
	temp_model_id = 1;
	
	while temp_model_id <= model_count loop
		SELECT economy_seat_capacity, business_seat_capacity, platinum_seat_capacity INTO economy, business, platinum 
			FROM aircraft_model WHERE model_id=temp_model_id;
		
		current_seat = 1;
		while current_seat <= platinum loop
			INSERT INTO aircraft_seat VALUES(temp_model_id, current_seat, 1);
			current_seat = current_seat + 1;
		end loop;
		business = business + current_seat;
		while current_seat < business loop
			INSERT INTO aircraft_seat VALUES(temp_model_id, current_seat, 2);
			current_seat = current_seat + 1;
		end loop;
		economy = economy + current_seat;
		while current_seat < economy loop
			INSERT INTO aircraft_seat VALUES(temp_model_id, current_seat, 3);
			current_seat = current_seat + 1;
		end loop;
        temp_model_id = temp_model_id + 1;
	end loop;
	
END;
$$;

CALL insert_seats();


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

CALL insert_route_price(1,800,500,145);
CALL insert_route_price(2,700,600,161);
CALL insert_route_price(3,750,670,166);
CALL insert_route_price(4,610,510,147);
CALL insert_route_price(5,500,430,135);
CALL insert_route_price(6,680,590,192);
CALL insert_route_price(7,610,510,144);
CALL insert_route_price(8,548,400,116);
CALL insert_route_price(9,500,350,105);
CALL insert_route_price(10,450,330,97);
CALL insert_route_price(11,400,300,90);
CALL insert_route_price(12,350,245,63);
CALL insert_route_price(13,330,220,57);
CALL insert_route_price(14,840,670,203);
CALL insert_route_price(15,780,625,195);
CALL insert_route_price(16,680,500,165);
CALL insert_route_price(17,310,200,49);
CALL insert_route_price(18,500,350,92);
CALL insert_route_price(19,580,450,153);
CALL insert_route_price(20,980,720,297);
CALL insert_route_price(21,1100,800,330);
CALL insert_route_price(22,600,430,134);
CALL insert_route_price(23,510,310,103);
CALL insert_route_price(24,520,315,106);
CALL insert_route_price(25,280,170,30);
CALL insert_route_price(26,580,360,166);
CALL insert_route_price(27,820,580,236);
CALL insert_route_price(28,1100,810,330);
CALL insert_route_price(29,1050,790,320);
CALL insert_route_price(30,650,480,149);
CALL insert_route_price(31,650,480,149);
CALL insert_route_price(32,410,230,59);
CALL insert_route_price(33,1050,820,318);
CALL insert_route_price(34,780,520,210);
CALL insert_route_price(35,620,410,180);
CALL insert_route_price(36,420,280,87);
CALL insert_route_price(37,430,290,90);
CALL insert_route_price(38,512,370,128);
CALL insert_route_price(39,730,520,200);
CALL insert_route_price(40,880,620,300);
CALL insert_route_price(41,730,520,200);
CALL insert_route_price(42,480,300,85);
CALL insert_route_price(43,500,310,90);
CALL insert_route_price(44,680,420,150);
CALL insert_route_price(45,580,320,121);
CALL insert_route_price(46,590,350,140);
CALL insert_route_price(47,480,280,110);
CALL insert_route_price(48,480,320,80);
CALL insert_route_price(49,470,310,130);
CALL insert_route_price(50,480,320,80);
CALL insert_route_price(51,580,300,116);
CALL insert_route_price(52,520,340,148);
CALL insert_route_price(53,510,320,144);
CALL insert_route_price(54,650,420,238);
CALL insert_route_price(55,420,290,105);
CALL insert_route_price(56,610,310,86);
CALL insert_route_price(57,380,200,46);
CALL insert_route_price(58,430,280,100);
CALL insert_route_price(59,620,470,226);
CALL insert_route_price(60,530,340,144);
CALL insert_route_price(61,640,470,180);
CALL insert_route_price(62,660,490,200);
CALL insert_route_price(63,560,430,170);
CALL insert_route_price(64,390,220,83);



-------------------INSERTING FLIGHT SCHEDULES---------------

CALL scheduleFlights(1,1,'2021-05-01','07:00:00');
CALL scheduleFlights(57,1,'2021-05-01','20:00:00');
CALL scheduleFlights(10,1,'2021-05-02','09:00:00');
CALL scheduleFlights(1,1,'2021-05-03','07:00:00');
CALL scheduleFlights(57,1,'2021-05-03','20:00:00');
CALL scheduleFlights(10,1,'2021-05-04','09:00:00');
CALL scheduleFlights(1,1,'2021-05-05','07:00:00');
CALL scheduleFlights(57,1,'2021-05-05','20:00:00');
CALL scheduleFlights(10,1,'2021-05-06','09:00:00');

CALL scheduleFlights(34,2,'2021-05-01','09:00:00');
CALL scheduleFlights(31,2,'2021-05-02','03:00:00');
CALL scheduleFlights(61,2,'2021-05-03','16:30:00');
CALL scheduleFlights(34,2,'2021-05-04','09:00:00');
CALL scheduleFlights(31,2,'2021-05-05','03:00:00');
CALL scheduleFlights(61,2,'2021-05-06','16:30:00');
CALL scheduleFlights(34,2,'2021-05-07','09:00:00');
CALL scheduleFlights(31,2,'2021-05-08','03:00:00');
CALL scheduleFlights(61,2,'2021-05-09','16:30:00');

CALL scheduleFlights(5,3,'2021-05-01','15:30:00');
CALL scheduleFlights(41,3,'2021-05-02','01:30:00');
CALL scheduleFlights(5,3,'2021-05-03','15:30:00');
CALL scheduleFlights(41,3,'2021-05-04','01:30:00');
CALL scheduleFlights(5,3,'2021-05-05','15:30:00');
CALL scheduleFlights(41,3,'2021-05-06','01:30:00');
CALL scheduleFlights(5,3,'2021-05-07','15:30:00');
CALL scheduleFlights(41,3,'2021-05-08','01:30:00');

CALL scheduleFlights(17,4,'2021-05-01','03:30:00');
CALL scheduleFlights(57,4,'2021-05-01','15:00:00');
CALL scheduleFlights(17,4,'2021-05-02','03:30:00');
CALL scheduleFlights(57,4,'2021-05-02','15:00:00');
CALL scheduleFlights(17,4,'2021-05-03','03:30:00');
CALL scheduleFlights(57,4,'2021-05-03','15:00:00');
CALL scheduleFlights(17,4,'2021-05-04','03:30:00');
CALL scheduleFlights(57,4,'2021-05-04','15:00:00');
CALL scheduleFlights(17,4,'2021-05-05','03:30:00');
CALL scheduleFlights(57,4,'2021-05-05','15:00:00');
CALL scheduleFlights(17,4,'2021-05-06','03:30:00');
CALL scheduleFlights(57,4,'2021-05-06','15:00:00');
CALL scheduleFlights(17,4,'2021-05-07','03:30:00');
CALL scheduleFlights(57,4,'2021-05-07','15:00:00');
CALL scheduleFlights(17,4,'2021-05-08','03:30:00');
CALL scheduleFlights(57,4,'2021-05-08','15:00:00');



CALL scheduleFlights(11,5,'2021-05-01','07:30:00');
CALL scheduleFlights(9,5,'2021-05-01','20:00:00');
CALL scheduleFlights(11,5,'2021-05-05','09:30:00');
CALL scheduleFlights(9,5,'2021-05-05','21:00:00');
CALL scheduleFlights(11,5,'2021-05-09','07:30:00');
CALL scheduleFlights(9,5,'2021-05-09','20:00:00');

CALL scheduleFlights(47,6,'2021-05-01','07:30:00');
CALL scheduleFlights(7,6,'2021-05-01','20:00:00');
CALL scheduleFlights(63,6,'2021-05-02','09:30:00');
CALL scheduleFlights(50,6,'2021-05-02','21:00:00');
CALL scheduleFlights(17,6,'2021-05-03','10:00:00');
CALL scheduleFlights(56,6,'2021-05-03','21:00:00');
CALL scheduleFlights(47,6,'2021-05-04','10:30:00');
CALL scheduleFlights(7,6,'2021-05-04','20:00:00');
CALL scheduleFlights(63,6,'2021-05-05','09:30:00');
CALL scheduleFlights(50,6,'2021-05-05','21:00:00');
CALL scheduleFlights(17,6,'2021-05-06','07:00:00');
CALL scheduleFlights(56,6,'2021-05-06','21:00:00');


CALL scheduleFlights(40,7,'2021-05-01','07:30:00');
CALL scheduleFlights(31,7,'2021-05-01','20:00:00');
CALL scheduleFlights(64,7,'2021-05-02','09:30:00');
CALL scheduleFlights(15,7,'2021-05-02','21:00:00');
CALL scheduleFlights(40,7,'2021-05-03','07:30:00');
CALL scheduleFlights(31,7,'2021-05-03','20:00:00');
CALL scheduleFlights(64,7,'2021-05-04','09:30:00');
CALL scheduleFlights(15,7,'2021-05-04','21:00:00');
CALL scheduleFlights(40,7,'2021-05-05','07:30:00');
CALL scheduleFlights(31,7,'2021-05-05','20:00:00');
CALL scheduleFlights(64,7,'2021-05-06','09:30:00');
CALL scheduleFlights(15,7,'2021-05-07','21:00:00');

CALL scheduleFlights(2,8,'2021-05-01','22:30:00');
CALL scheduleFlights(19,8,'2021-05-02','20:00:00');
CALL scheduleFlights(2,8,'2021-05-03','22:30:00');
CALL scheduleFlights(19,8,'2021-05-04','20:00:00');
CALL scheduleFlights(2,8,'2021-05-05','22:30:00');
CALL scheduleFlights(19,8,'2021-05-06','20:00:00');
CALL scheduleFlights(2,8,'2021-05-07','22:30:00');
CALL scheduleFlights(19,8,'2021-05-08','20:00:00');
