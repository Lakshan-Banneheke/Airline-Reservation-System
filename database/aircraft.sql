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

