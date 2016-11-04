use letitridesystem;

delete from rut where Email = 'death1@gmail.com';
delete from rut where Email = 'death2@gmail.com';

insert into rut (Email, Password, Name, Phonenumber) values ('death1@gmail.com', 'password', 'Bogeyman', '123456789');
insert into rut (Email, Password, Name, Phonenumber) values ('death2@gmail.com', 'password', 'Bogeyman2', '123456780');

delete from cit where (CCnumber = 'Test1');

insert into cit(UserID, CCnumber) values ((SELECT UserID from rut where Email = 'death1@gmail.com'), 'Test1');

insert into dit(UserID, Driverlicense, Licenseplate, Carmodel, Routingnumber, Bankaccountnumber) values ((SELECT UserID from rut where Email = 'death2@gmail.com'), 'Test2', 'Smash', 'F1', '123456789', '135792680');