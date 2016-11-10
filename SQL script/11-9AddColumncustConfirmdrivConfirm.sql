USE letitridesystem;

ALTER TABLE trans ADD drivConfirm CHAR(2) DEFAULT 'no';
ALTER TABLE trans ADD custConfirm CHAR(2) DEFAULT 'no';