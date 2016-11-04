use letitridesystem;

insert into rut (email, password, name, Phonenumber) values ('bc@gmail.com', 'bilary_clinton', 'Bilary Clinton', '1234567890');
insert into rut (email, password, name, Phonenumber) values ('rd@gmail.com', 'donald_dump', 'Duonald Dump', '012345678');
insert into rut (email, password, name, Phonenumber) values ('dd@gmail.com', 'donald_duck', 'Donald Duck', '000000');
insert into rut (email, password, name, Phonenumber) values ('tm@gmail.com', 'test_monkey', 'Test Monkey', '111111111');
insert into rut (email, password, name, Phonenumber) values ('rb@gmail.com', 'runaway_banana', 'Runaway Banana', '999999');
insert into rut (email, password, name, Phonenumber) values ('ec@gmail.com', 'escape_convict', 'Escape Convict', '111111');
insert into rut (email, password, name, Phonenumber) values ('tm2@gmail.com', 'test_monkey2', 'Test Monkey2', '222222222');
insert into rut (email, password, name, Phonenumber) values ('tm3@gmail.com', 'test_monkey3', 'Test Monkey3', '333333333');
insert into rut (email, password, name, Phonenumber) values ('tm4@gmail.com', 'test_monkey4', 'Test Monkey4', '444444444');
insert into rut (email, password, name, Phonenumber) values ('tm5@gmail.com', 'test_monkey5', 'Test Monkey5', '555555555');

insert into cit (userid, ccnumber) values ((select userid from rut where email = 'bc@gmail.com'), '111111');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'rd@gmail.com'), '222222');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'dd@gmail.com'), '333333');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'tm@gmail.com'), '444444');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'rb@gmail.com'), '555555');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'ec@gmail.com'), '666666');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'tm2@gmail.com'), '777777');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'tm3@gmail.com'), '888888');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'tm4@gmail.com'), '999999');
insert into cit (userid, ccnumber) values ((select userid from rut where email = 'tm5@gmail.com'), '000000');

insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'bc@gmail.com'), 'A1234567', 'B1234567', 'F1', '123456789', '0');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'rd@gmail.com'), 'C1234567', 'D1234567', 'Trumpmobile', '123456789', '1');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'dd@gmail.com'), 'E1234567', 'F1234567', 'Duck Rocket', '123456789', '2');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'tm@gmail.com'), 'G1234567', 'H1234567', 'Super Monkey Ball', '123456789', '3');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'rb@gmail.com'), 'I1234567', 'J1234567', 'Run Banana Run', '123456789', '4');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'ec@gmail.com'), 'K1234567', 'L1234567', 'Invisible Plane', '123456789', '5');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'tm2@gmail.com'), 'M1234567', 'N1234567', 'Monkey Ball 2', '123456789', '6');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'tm3@gmail.com'), 'O1234567', 'P1234567', 'Monkey Ball 3', '123456789', '7');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'tm4@gmail.com'), 'Q1234567', 'R1234567', 'Monkey Ball 4', '123456789', '8');
insert into dit (userid, driverlicense, licenseplate, carmodel, routingnumber, bankaccountnumber) values ((select userid from rut where email = 'tm5@gmail.com'), 'S1234567', 'T1234567', 'Monkey Ball 5', '123456789', '9');
