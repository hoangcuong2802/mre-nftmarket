create table ActionTracking
(
    Id int primary key Identity(1,1),
    AltId varchar(50),
    Action varchar(20),
    SpaceId varchar(100),
    EventId varchar(100),
    ActionStartTime datetime,
    ActionEndTime datetime,
    Description text,
    createdAt datetime,
    updatedAt datetime
)