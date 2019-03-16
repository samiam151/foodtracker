truncate weight_entries;

do $$
declare uid record;
begin

    for uid in ( select id from users )
    loop
        perform add_mock_weights(uid.id);
    end loop;

end $$
language plpgsql;

select * from users;
select * from weight_entries
order by user_id, entry_date;