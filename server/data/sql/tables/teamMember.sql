CREATE TABLE TeamMember (
    TeamId BIGINT FOREIGN KEY REFERENCES Team(Id),
    MemberId BIGINT FOREIGN KEY REFERENCES Member(Id)
);