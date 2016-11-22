Use letitridesystem;

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