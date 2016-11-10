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