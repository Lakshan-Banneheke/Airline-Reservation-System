---------------------INSERTING TRAVELLER CLASS---------------------------
INSERT INTO traveller_class(class_name) VALUES ('Platinum');
INSERT INTO traveller_class(class_name) VALUES ('Business');
INSERT INTO traveller_class(class_name) VALUES ('Economy');

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
