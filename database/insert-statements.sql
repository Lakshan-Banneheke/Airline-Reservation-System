INSERT INTO organizational_info VALUES ('B Airways','+61396906345','info@bairways.com','314, 3rd Floor, Gotham Towers, Melbourne, Victoria, Australia','2229993949');

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
INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,economy_seats_per_row,business_seats_per_row,platinum_seats_per_row,max_load,fuel_capacity,avg_airspeed)
VALUES('Boeing 737','MAX 10','Boeing Commercial Airplanes',150,24,12,6,4,4,88300,25941,838);

INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,economy_seats_per_row,business_seats_per_row,platinum_seats_per_row,max_load,fuel_capacity,avg_airspeed)
VALUES('Boeing 757','300','Boeing Commercial Airplanes',198,32,12,6,4,4,123830,43400,918);

INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,economy_seats_per_row,business_seats_per_row,platinum_seats_per_row,max_load,fuel_capacity,avg_airspeed)
VALUES('Airbus A380','800','Airbus',500,48,20,10,6,4,575000,323546,903);

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

INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B001','BIA', 'BKK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B002','BIA', 'CGK', '04:45');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B003','BIA', 'DPS', '07:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B004','BIA', 'DEL', '03:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B005','BIA', 'BOM', '02:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B006','BIA', 'MAA', '01:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B007','BIA', 'DMK', '03:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B008','BIA', 'SIN', '03:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B009','HRI', 'SIN', '03:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B010','SIN', 'BIA', '03:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B011','SIN', 'HRI', '03:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B012','SIN', 'CGK', '01:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B013','SIN', 'DPS', '02:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B014','SIN', 'DEL', '05:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B015','SIN', 'BOM', '05:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B016','SIN', 'MAA', '03:55');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B017','SIN', 'BKK', '02:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B018','SIN', 'DMK', '02:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B019','CGK', 'BIA', '04:35');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B020','CGK', 'DEL', '08:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B021','CGK', 'BOM', '08:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B022','CGK', 'MAA', '07:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B023','CGK', 'BKK', '03:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B024','CGK', 'DMK', '03:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B025','CGK', 'SIN', '01:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B026','DPS', 'BIA', '07:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B027','DPS', 'DEL', '09:55');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B028','DPS', 'BOM', '09:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B029','DPS', 'MAA', '08:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B030','DPS', 'BKK', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B031','DPS', 'DMK', '04:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B032','DPS', 'SIN', '02:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B033','DEL', 'CGK', '08:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B034','DEL', 'DPS', '08:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B035','DEL', 'BIA', '03:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B036','DEL', 'BKK', '03:45');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B037','DEL', 'DMK', '03:45');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B038','DEL', 'SIN', '05:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B039','BOM', 'CGK', '06:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B040','BOM', 'DPS', '09:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B041','BOM', 'BIA', '02:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B042','BOM', 'BKK', '04:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B043','BOM', 'DMK', '04:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B044','BOM', 'SIN', '05:14');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B045','MAA', 'CGK', '05:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B046','MAA', 'DPS', '06:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B047','MAA', 'BIA', '01:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B048','MAA', 'BKK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B049','MAA', 'DMK', '03:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B050','MAA', 'SIN', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B051','BKK', 'CGK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B052','BKK', 'DPS', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B053','BKK', 'BIA', '03:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B054','BKK', 'DEL', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B055','BKK', 'BOM', '04:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B056','BKK', 'MAA', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B057','BKK', 'SIN', '02:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B058','DMK', 'CGK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B059','DMK', 'DPS', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B060','DMK', 'BIA', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B061','DMK', 'DEL', '04:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B062','DMK', 'BOM', '04:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B063','DMK', 'MAA', '03:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B064','DMK', 'SIN', '02:20');

---------------------INSERTING TRAVELLER CLASS---------------------------
INSERT INTO traveller_class(class_name) VALUES ('Platinum');
INSERT INTO traveller_class(class_name) VALUES ('Business');
INSERT INTO traveller_class(class_name) VALUES ('Economy');

---------------------INSERTING ROUTES-----------------------------




CALL insert_seats();




CALL insert_route_price('B001',800,500,145);
CALL insert_route_price('B002',700,600,161);
CALL insert_route_price('B003',750,670,166);
CALL insert_route_price('B004',610,510,147);
CALL insert_route_price('B005',500,430,135);
CALL insert_route_price('B006',680,590,192);
CALL insert_route_price('B007',610,510,144);
CALL insert_route_price('B008',548,400,116);
CALL insert_route_price('B009',500,350,105);
CALL insert_route_price('B010',450,330,97);
CALL insert_route_price('B011',400,300,90);
CALL insert_route_price('B012',350,245,63);
CALL insert_route_price('B013',330,220,57);
CALL insert_route_price('B014',840,670,203);
CALL insert_route_price('B015',780,625,195);
CALL insert_route_price('B016',680,500,165);
CALL insert_route_price('B017',310,200,49);
CALL insert_route_price('B018',500,350,92);
CALL insert_route_price('B019',580,450,153);
CALL insert_route_price('B020',980,720,297);
CALL insert_route_price('B021',1100,800,330);
CALL insert_route_price('B022',600,430,134);
CALL insert_route_price('B023',510,310,103);
CALL insert_route_price('B024',520,315,106);
CALL insert_route_price('B025',280,170,30);
CALL insert_route_price('B026',580,360,166);
CALL insert_route_price('B027',820,580,236);
CALL insert_route_price('B028',1100,810,330);
CALL insert_route_price('B029',1050,790,320);
CALL insert_route_price('B030',650,480,149);
CALL insert_route_price('B031',650,480,149);
CALL insert_route_price('B032',410,230,59);
CALL insert_route_price('B033',1050,820,318);
CALL insert_route_price('B034',780,520,210);
CALL insert_route_price('B035',620,410,180);
CALL insert_route_price('B036',420,280,87);
CALL insert_route_price('B037',430,290,90);
CALL insert_route_price('B038',512,370,128);
CALL insert_route_price('B039',730,520,200);
CALL insert_route_price('B040',880,620,300);
CALL insert_route_price('B041',730,520,200);
CALL insert_route_price('B042',480,300,85);
CALL insert_route_price('B043',500,310,90);
CALL insert_route_price('B044',680,420,150);
CALL insert_route_price('B045',580,320,121);
CALL insert_route_price('B046',590,350,140);
CALL insert_route_price('B047',480,280,110);
CALL insert_route_price('B048',480,320,80);
CALL insert_route_price('B049',470,310,130);
CALL insert_route_price('B050',480,320,80);
CALL insert_route_price('B051',580,300,116);
CALL insert_route_price('B052',520,340,148);
CALL insert_route_price('B053',510,320,144);
CALL insert_route_price('B054',650,420,238);
CALL insert_route_price('B055',420,290,105);
CALL insert_route_price('B056',610,310,86);
CALL insert_route_price('B057',380,200,46);
CALL insert_route_price('B058',430,280,100);
CALL insert_route_price('B059',620,470,226);
CALL insert_route_price('B060',530,340,144);
CALL insert_route_price('B061',640,470,180);
CALL insert_route_price('B062',660,490,200);
CALL insert_route_price('B063',560,430,170);
CALL insert_route_price('B064',390,220,83);



-------------------INSERTING FLIGHT SCHEDULES---------------

CALL scheduleFlights('B001',1,'2021-05-01','07:00:00');
CALL scheduleFlights('B057',1,'2021-05-01','20:00:00');
CALL scheduleFlights('B010',1,'2021-05-02','09:00:00');
CALL scheduleFlights('B001',1,'2021-05-03','07:00:00');
CALL scheduleFlights('B057',1,'2021-05-03','20:00:00');
CALL scheduleFlights('B010',1,'2021-05-04','09:00:00');
CALL scheduleFlights('B001',1,'2021-05-05','07:00:00');
CALL scheduleFlights('B057',1,'2021-05-05','20:00:00');
CALL scheduleFlights('B010',1,'2021-05-06','09:00:00');

CALL scheduleFlights('B034',2,'2021-05-01','09:00:00');
CALL scheduleFlights('B031',2,'2021-05-02','03:00:00');
CALL scheduleFlights('B061',2,'2021-05-03','16:30:00');
CALL scheduleFlights('B034',2,'2021-05-04','09:00:00');
CALL scheduleFlights('B031',2,'2021-05-05','03:00:00');
CALL scheduleFlights('B061',2,'2021-05-06','16:30:00');
CALL scheduleFlights('B034',2,'2021-05-07','09:00:00');
CALL scheduleFlights('B031',2,'2021-05-08','03:00:00');
CALL scheduleFlights('B061',2,'2021-05-09','16:30:00');

CALL scheduleFlights('B005',3,'2021-05-01','15:30:00');
CALL scheduleFlights('B041',3,'2021-05-02','01:30:00');
CALL scheduleFlights('B005',3,'2021-05-03','15:30:00');
CALL scheduleFlights('B041',3,'2021-05-04','01:30:00');
CALL scheduleFlights('B005',3,'2021-05-05','15:30:00');
CALL scheduleFlights('B041',3,'2021-05-06','01:30:00');
CALL scheduleFlights('B005',3,'2021-05-07','15:30:00');
CALL scheduleFlights('B041',3,'2021-05-08','01:30:00');

CALL scheduleFlights('B017',4,'2021-05-01','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-01','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-02','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-02','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-03','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-03','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-04','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-04','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-05','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-05','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-06','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-06','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-07','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-07','15:00:00');
CALL scheduleFlights('B017',4,'2021-05-08','03:30:00');
CALL scheduleFlights('B057',4,'2021-05-08','15:00:00');



CALL scheduleFlights('B011',5,'2021-05-01','07:30:00');
CALL scheduleFlights('B009',5,'2021-05-01','20:00:00');
CALL scheduleFlights('B011',5,'2021-05-05','09:30:00');
CALL scheduleFlights('B009',5,'2021-05-05','21:00:00');
CALL scheduleFlights('B011',5,'2021-05-09','07:30:00');
CALL scheduleFlights('B009',5,'2021-05-09','20:00:00');

CALL scheduleFlights('B047',6,'2021-05-01','07:30:00');
CALL scheduleFlights('B007',6,'2021-05-01','20:00:00');
CALL scheduleFlights('B063',6,'2021-05-02','09:30:00');
CALL scheduleFlights('B050',6,'2021-05-02','21:00:00');
CALL scheduleFlights('B017',6,'2021-05-03','10:00:00');
CALL scheduleFlights('B056',6,'2021-05-03','21:00:00');
CALL scheduleFlights('B047',6,'2021-05-04','10:30:00');
CALL scheduleFlights('B007',6,'2021-05-04','20:00:00');
CALL scheduleFlights('B063',6,'2021-05-05','09:30:00');
CALL scheduleFlights('B050',6,'2021-05-05','21:00:00');
CALL scheduleFlights('B017',6,'2021-05-06','07:00:00');
CALL scheduleFlights('B056',6,'2021-05-06','21:00:00');


CALL scheduleFlights('B040',7,'2021-05-01','07:30:00');
CALL scheduleFlights('B031',7,'2021-05-01','20:00:00');
CALL scheduleFlights('B064',7,'2021-05-02','09:30:00');
CALL scheduleFlights('B015',7,'2021-05-02','21:00:00');
CALL scheduleFlights('B040',7,'2021-05-03','07:30:00');
CALL scheduleFlights('B031',7,'2021-05-03','20:00:00');
CALL scheduleFlights('B064',7,'2021-05-04','09:30:00');
CALL scheduleFlights('B015',7,'2021-05-04','21:00:00');
CALL scheduleFlights('B040',7,'2021-05-05','07:30:00');
CALL scheduleFlights('B031',7,'2021-05-05','20:00:00');
CALL scheduleFlights('B064',7,'2021-05-06','09:30:00');
CALL scheduleFlights('B015',7,'2021-05-07','21:00:00');

CALL scheduleFlights('B002',8,'2021-05-01','22:30:00');
CALL scheduleFlights('B019',8,'2021-05-02','20:00:00');
CALL scheduleFlights('B002',8,'2021-05-03','22:30:00');
CALL scheduleFlights('B019',8,'2021-05-04','20:00:00');
CALL scheduleFlights('B002',8,'2021-05-05','22:30:00');
CALL scheduleFlights('B019',8,'2021-05-06','20:00:00');
CALL scheduleFlights('B002',8,'2021-05-07','22:30:00');
CALL scheduleFlights('B019',8,'2021-05-08','20:00:00');
