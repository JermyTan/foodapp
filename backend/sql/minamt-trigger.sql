CREATE OR REPLACE function min_amt_order_constraint () RETURNS TRIGGER AS $$
DECLARE
	rest_name	text;
  curr_order_amt float;
  min_amt float;
BEGIN
  curr_order_amt = NEW.fprice;
  rest_name = NEW.rname;
  SELECT minamt INTO min_amt
    FROM Restaurants
    WHERE rname = rest_name
    AND minamt <= curr_order_amt;
  
  IF min_amt IS NULL THEN
  RAISE exception '%Min order is not met%', rest_name, min_amt;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS min_amt_order_trigger on Orders CASCADE;

CREATE TRIGGER min_amt_order_trigger
  BEFORE UPDATE of fprice OR INSERT
  ON Orders
  FOR EACH ROW
  EXECUTE FUNCTION
  min_amt_order_constraint();