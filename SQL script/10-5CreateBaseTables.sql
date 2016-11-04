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