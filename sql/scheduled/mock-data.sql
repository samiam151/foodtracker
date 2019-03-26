do $$
DECLARE 
    usr record;
begin
	for usr in (select id from users)
	loop
		perform pr_add_mock_food_data(usr.id);
	end loop;
end;
$$