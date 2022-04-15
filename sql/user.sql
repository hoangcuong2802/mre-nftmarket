create table Users
(
    Id int primary key Identity(1,1),
    AltName varchar(500),
    AltId varchar(50),
    FirstName varchar(100),
    LastName varchar(100),
    Email varchar(100),
    RecruitdayId varchar(100),
    PhoneNumber varchar(100),
    createdAt datetime,
    updatedAt datetime
)