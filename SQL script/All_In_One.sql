drop database if exists letitridesystem;
create database letitridesystem;

use letitridesystem;

drop table if exists rut;
drop table if exists cit;
drop table if exists dit;

create table rut
(
UserID int(64) zerofill not null auto_increment,
Email varchar(40) not null,
Password varchar(30) not null,
Name varchar(255) not null,
Phonenumber varchar(10) not null,
primary key(UserID)
); 

create table cit
(
UserID int(64) zerofill not null auto_increment,
CCnumber char(16) not null,
foreign key(UserID) references rut(UserID)
);

create table dit
(
UserID int(64) zerofill not null auto_increment,
Driverlicense char(8) not null,
Licenseplate char(7) not null,
Carmodel varchar(20) not null,
Routingnumber char(9) not null,
Bankaccountnumber varchar(17) not null,
primary key(UserID),
foreign key(UserID) references rut(UserID)
);

drop database if exists LetItRideSystem;

CREATE database LetItRideSystem;

USE LetItRideSystem;

drop table if exists rdyDriv;
drop table if exists trans;
drop table if exists dit;
drop table if exists cit;
drop table if exists rut;

create table rut
(
UserID int(64) zerofill not null auto_increment,
Email varchar(40) not null unique,
Password varchar(30) not null,
Name varchar(255) not null,
Phonenumber varchar(10) not null unique,
primary key(UserID)
); 

create table cit
(
UserID int(64) zerofill not null,
CCnumber char(16) not null unique,
foreign key(UserID) references rut(UserID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table dit
(
UserID int(64) zerofill not null,
Driverlicense char(8) not null unique,
Licenseplate char(7) not null unique,
Carmodel varchar(20) not null,
Routingnumber char(9) not null,
Bankaccountnumber varchar(17) not null unique,
primary key(UserID),
foreign key(UserID) references rut(UserID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table trans
(
TransID int(64) zerofill not null auto_increment,
CustID int(64) zerofill not null,
DrivID int(64) zerofill not null,
TransDate datetime not null DEFAULT Current_TimeStamp(),
State char(1) not null DEFAULT 'I',
primary key(TransID),
foreign key(CustID) references rut(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key(DrivID) references rut(UserID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table rdyDriv
(
DrivID int(64) zerofill not null references dit(DrivID) ON DELETE CASCADE ON UPDATE CASCADE,
DrivLocat varchar(50) not null,
primary key(DrivID),
foreign key(DrivID) references rut(UserID) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists testInsert;

create table testInsert
(
OrigLoc varchar(40),
Desti varchar(40)
);

use letitridesystem;

delete from rut where Email = 'death1@gmail.com';
delete from rut where Email = 'death2@gmail.com';

insert into rut (Email, Password, Name, Phonenumber) values ('death1@gmail.com', 'password', 'Bogeyman', '123456789');
insert into rut (Email, Password, Name, Phonenumber) values ('death2@gmail.com', 'password', 'Bogeyman2', '123456780');

delete from cit where (CCnumber = 'Test1');

insert into cit(UserID, CCnumber) values ((SELECT UserID from rut where Email = 'death1@gmail.com'), 'Test1');

insert into dit(UserID, Driverlicense, Licenseplate, Carmodel, Routingnumber, Bankaccountnumber) values ((SELECT UserID from rut where Email = 'death2@gmail.com'), 'Test2', 'Smash', 'F1', '123456789', '135792680');

ALTER TABLE rdydriv
ADD lat double;

ALTER TABLE rdydriv
ADD lng double;

ALTER TABLE trans
ADD custAddr varchar(70);

ALTER TABLE trans
ADD destin varchar(70);

ALTER TABLE trans
ADD lat double;

ALTER TABLE trans
ADD lng double;

ALTER TABLE trans
ADD fare double default 5.00;

ALTER TABLE trans
Change column lat custLat double;

ALTER TABLE trans
Change column lng custLng double;

ALTER TABLE trans
ADD destiLat double;

ALTER TABLE trans
ADD destiLng double;

ALTER TABLE trans
ADD drivCurAddr varchar(100);

ALTER TABLE trans
ADD drivLat double;

ALTER TABLE trans
ADD drivLng double;

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

drop index phonenumber on rut;

ALTER TABLE trans ADD drivConfirm CHAR(2) DEFAULT 'no';
ALTER TABLE trans ADD custConfirm CHAR(2) DEFAULT 'no';

alter table rut ADD Image BLOB;