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