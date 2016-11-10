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