select a.date_data as date,
    weight_data as weight,
    calories_data as calories,
    workouts_data as calories_burned
from fn_get_weight_for_all_days($1) a, 
    fn_get_calories_for_all_days($1) b,
    fn_get_workouts_for_all_days($1) c
    where a.date_data = b.date_data
order by 1