select 
    weight_data as weight,
    date_data as date
from public.fn_get_weight_for_all_days($1);