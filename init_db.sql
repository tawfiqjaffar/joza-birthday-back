create user jozabday with password 'jozabday';
create database jozabday;
grant create on database jozabday to jozabday;
alter user jozabday with superuser;
\connect jozabday;
create schema jozabday authorization jozabday;
grant all privileges on database jozabday to jozabday;
