INSERT INTO organizational_info VALUES ('B Airways','+61396906345','info@bairways.com','314, 3rd Floor, Gotham Towers', 'Melbourne, Victoria', 'Australia','2229993949');

---------------------INSERT CUSTOMER CATEGORY---------------------
INSERT INTO customer_category(cat_name,discount_percentage,min_bookings) VALUES ('General',0,0);
INSERT INTO customer_category(cat_name,discount_percentage,min_bookings) VALUES ('Frequent',5,5);
INSERT INTO customer_category(cat_name,discount_percentage,min_bookings) VALUES ('Gold',9,10);

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
INSERT INTO airport(airport_code,location_id,destination_image) VALUES('BIA',3,'data:image/jpeg;base64,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');
INSERT INTO airport(airport_code,location_id,destination_image) VALUES('HRI',2,'http://www.maga.lk/wp-content/uploads/2015/02/11-Hambantota-Admin-06.jpg');

INSERT INTO airport(airport_code,location_id,destination_image) VALUES('CGK',5,'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/b2/e2/00.jpg');
INSERT INTO airport(airport_code,location_id,destination_image) VALUES('DPS',6,'https://img.traveltriangle.com/blog/wp-content/uploads/2015/05/Places-to-visit-in-Bali-Cover1.jpg');

INSERT INTO airport(airport_code,location_id,destination_image) VALUES('DEL',9,'https://www.fabhotels.com/blog/wp-content/uploads/2019/02/Akshardham-Temple.jpg');
INSERT INTO airport(airport_code,location_id,destination_image) VALUES('BOM',11,'https://www.travenix.com/wp-content/uploads/2017/06/Taj-Mahal-Palace-historical-mumbai.jpg');
INSERT INTO airport(airport_code,location_id,destination_image) VALUES('MAA',13,'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/4b/85/80.jpg');

INSERT INTO airport(airport_code,location_id,destination_image) VALUES('BKK',15,'https://mediaim.expedia.com/localexpert/644344/37750169-c5b9-4120-a363-87fac226fb02.jpg?impolicy=resizecrop&rw=1005&rh=565');
INSERT INTO airport(airport_code,location_id,destination_image) VALUES('DMK',15,'https://www.iicom.org/wp-content/uploads/30UltimateThailand__HERO_shutterstock_698378932.jpg');

INSERT INTO airport(airport_code,location_id,destination_image) VALUES('SIN',17,'https://images.adsttc.com/media/images/5481/daaa/e58e/cef0/ed00/000e/large_jpg/Jewel_Changi_Airport_Aerial_view_CP.jpg?1417796254');

---------------------INSERTING TRAVELLER CLASS---------------------------
INSERT INTO traveller_class(class_name) VALUES ('Platinum');
INSERT INTO traveller_class(class_name) VALUES ('Business');
INSERT INTO traveller_class(class_name) VALUES ('Economy');

---------------------INSERTING AIRCRAFT MODELS---------------------------

--max_load in kg -- speed in kmph -- fuel_capacity in litres--
INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,economy_seats_per_row,business_seats_per_row,platinum_seats_per_row,max_load,fuel_capacity,avg_airspeed,image_link)
VALUES('Boeing 737','MAX 10','Boeing Commercial',150,24,12,6,4,4,88300,25941,838,'https://www.boeing.com/resources/boeingdotcom/commercial/737max10/assets/images/gallery/gallery-full-0.jpg');

INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,economy_seats_per_row,business_seats_per_row,platinum_seats_per_row,max_load,fuel_capacity,avg_airspeed,image_link)
VALUES('Boeing 757','300','Boeing Commercial',198,32,12,6,4,4,123830,43400,918,'https://www.skytamer.com/1.2/2011/20111008-051.jpg');

INSERT INTO aircraft_model(model_name,variant,manufacturer_name,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity,economy_seats_per_row,business_seats_per_row,platinum_seats_per_row,max_load,fuel_capacity,avg_airspeed,image_link)
VALUES('Airbus A380','800','Airbus',500,48,20,10,6,4,575000,323546,903,'https://airbus-h.assetsadobe2.com/is/image/content/dam/products-and-solutions/formation-flight/Airbus-50th-years-anniversary-formation-flight-take-off-015.jpg?wid=991&fit=fit,1&qlt=85,0');

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



---------------------INSERTING ROUTES-----------------------------

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
CALL scheduleFlights('B001',1,'2024-03-03','07:30:00');
CALL scheduleFlights('B053',1,'2024-03-03','21:00:00');
CALL scheduleFlights('B001',1,'2024-03-04','07:00:00');
CALL scheduleFlights('B057',1,'2024-03-04','20:00:00');
CALL scheduleFlights('B010',1,'2024-03-05','09:00:00');
CALL scheduleFlights('B001',1,'2024-03-06','07:00:00');
CALL scheduleFlights('B057',1,'2024-03-06','20:00:00');
CALL scheduleFlights('B010',1,'2024-03-07','09:00:00');
CALL scheduleFlights('B001',1,'2024-03-08','07:00:00');
CALL scheduleFlights('B057',1,'2024-03-08','20:00:00');
CALL scheduleFlights('B010',1,'2024-03-09','09:00:00');

CALL scheduleFlights('B034',2,'2024-03-03','07:15:00');
CALL scheduleFlights('B027',2,'2024-03-03','19:00:00');
CALL scheduleFlights('B034',2,'2024-03-04','09:00:00');
CALL scheduleFlights('B031',2,'2024-03-05','03:00:00');
CALL scheduleFlights('B061',2,'2024-03-06','16:30:00');
CALL scheduleFlights('B034',2,'2024-03-07','09:00:00');
CALL scheduleFlights('B031',2,'2024-03-08','03:00:00');
CALL scheduleFlights('B061',2,'2024-03-09','16:30:00');
CALL scheduleFlights('B034',2,'2024-03-10','09:00:00');
CALL scheduleFlights('B031',2,'2024-03-11','03:00:00');
CALL scheduleFlights('B061',2,'2024-03-12','16:30:00');

CALL scheduleFlights('B005',3,'2024-03-03','07:15:00');
CALL scheduleFlights('B041',3,'2024-03-03','18:00:00');
CALL scheduleFlights('B005',3,'2024-03-04','15:30:00');
CALL scheduleFlights('B041',3,'2024-03-05','01:30:00');
CALL scheduleFlights('B005',3,'2024-03-06','15:30:00');
CALL scheduleFlights('B041',3,'2024-03-07','01:30:00');
CALL scheduleFlights('B005',3,'2024-03-08','15:30:00');
CALL scheduleFlights('B041',3,'2024-03-09','01:30:00');
CALL scheduleFlights('B005',3,'2024-03-10','15:30:00');
CALL scheduleFlights('B041',3,'2024-03-11','01:30:00');

CALL scheduleFlights('B017',4,'2024-03-03','07:10:00');
CALL scheduleFlights('B057',4,'2024-03-03','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-04','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-04','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-05','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-05','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-06','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-06','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-07','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-07','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-08','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-08','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-09','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-09','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-10','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-10','15:00:00');
CALL scheduleFlights('B017',4,'2024-03-11','03:30:00');
CALL scheduleFlights('B057',4,'2024-03-11','15:00:00');

CALL scheduleFlights('B011',5,'2024-03-03','07:15:00');
CALL scheduleFlights('B009',5,'2024-03-03','20:00:00');
CALL scheduleFlights('B011',5,'2024-03-04','07:30:00');
CALL scheduleFlights('B009',5,'2024-03-04','20:00:00');
CALL scheduleFlights('B011',5,'2024-03-08','09:30:00');
CALL scheduleFlights('B009',5,'2024-03-08','21:00:00');
CALL scheduleFlights('B011',5,'2024-03-12','07:30:00');
CALL scheduleFlights('B009',5,'2024-03-12','20:00:00');

CALL scheduleFlights('B047',6,'2024-03-03','08:00:00');
CALL scheduleFlights('B006',6,'2024-03-03','20:00:00');
CALL scheduleFlights('B047',6,'2024-03-04','07:30:00');
CALL scheduleFlights('B007',6,'2024-03-04','20:00:00');
CALL scheduleFlights('B063',6,'2024-03-05','09:30:00');
CALL scheduleFlights('B050',6,'2024-03-05','21:00:00');
CALL scheduleFlights('B017',6,'2024-03-06','10:00:00');
CALL scheduleFlights('B056',6,'2024-03-06','21:00:00');
CALL scheduleFlights('B047',6,'2024-03-07','10:30:00');
CALL scheduleFlights('B007',6,'2024-03-07','20:00:00');
CALL scheduleFlights('B063',6,'2024-03-08','09:30:00');
CALL scheduleFlights('B050',6,'2024-03-08','21:00:00');
CALL scheduleFlights('B017',6,'2024-03-09','07:00:00');
CALL scheduleFlights('B056',6,'2024-03-09','21:00:00');

CALL scheduleFlights('B040',7,'2024-03-03','08:00:00');
CALL scheduleFlights('B028',7,'2024-03-03','20:00:00');
CALL scheduleFlights('B040',7,'2024-03-04','07:30:00');
CALL scheduleFlights('B031',7,'2024-03-04','20:00:00');
CALL scheduleFlights('B064',7,'2024-03-05','09:30:00');
CALL scheduleFlights('B015',7,'2024-03-05','21:00:00');
CALL scheduleFlights('B040',7,'2024-03-06','07:30:00');
CALL scheduleFlights('B031',7,'2024-03-06','20:00:00');
CALL scheduleFlights('B064',7,'2024-03-07','09:30:00');
CALL scheduleFlights('B015',7,'2024-03-07','21:00:00');
CALL scheduleFlights('B040',7,'2024-03-08','07:30:00');
CALL scheduleFlights('B031',7,'2024-03-08','20:00:00');
CALL scheduleFlights('B064',7,'2024-03-09','09:30:00');
CALL scheduleFlights('B015',7,'2024-03-10','21:00:00');

CALL scheduleFlights('B002',8,'2024-03-03','08:00:00');
CALL scheduleFlights('B019',8,'2024-03-03','23:00:00');
CALL scheduleFlights('B002',8,'2024-03-04','22:30:00');
CALL scheduleFlights('B019',8,'2024-03-05','20:00:00');
CALL scheduleFlights('B002',8,'2024-03-06','22:30:00');
CALL scheduleFlights('B019',8,'2024-03-07','20:00:00');
CALL scheduleFlights('B002',8,'2024-03-08','22:30:00');
CALL scheduleFlights('B019',8,'2024-03-09','20:00:00');
CALL scheduleFlights('B002',8,'2024-03-10','22:30:00');
CALL scheduleFlights('B019',8,'2024-03-11','20:00:00');
