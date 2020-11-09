
select FirstName, LastName, City, State
from Person left join Address
on Person.PersonId = Address.PersonId;


# left (outer) join

select FirstName, LastName, City, State
from Person left outer join Address
on Person.PersonId = Address.PersonId;
