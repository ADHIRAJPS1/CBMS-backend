-- this is a setup for new tables in mysql

-- CREATE SINGLE BANNER WHOSE LINKS WILL BE ASSIGNED AT CAMPAIGN - CAROUSEL LEVEL
create table banner (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title varchar(50),
    m_img varchar(255),
    d_img varchar(255),
    is_createdAt TIMESTAMP DEFAULT current_timestamp,
    is_updatedAt TIMESTAMP DEFAULT current_timestamp,
    created_by varchar(255),
    updated_by varchar(255)
);

-- CREATE A CAMPAIGNCAROUSEL WHERE WE TAKE BANNER AND ASSIGN URL AND SEQUENCE
create table campaigncarousel ( 
id int primary key auto_increment ,
campaignid int not null,
bannerid int not null , 
alt varchar(255) , 
url varchar(255) , 
seq int default 1, 
created_At timestamp default current_timestamp , 
upadted_At timestamp default current_timestamp , 
created_by int ,  -- userid who created 
updated_by int   
);

