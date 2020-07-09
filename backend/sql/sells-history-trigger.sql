CREATE OR REPLACE function sells_history_trigger () RETURNS TRIGGER AS $$
DECLARE
	curr_time INTEGER;
  latest_record_time INTEGER;
  check_exists_fid INTEGER;
  check_identical INTEGER;
BEGIN
    curr_time = CAST(EXTRACT(epoch FROM NOW()) AS INT);
    SELECT datetime INTO latest_record_time
      FROM SellsHistory
      ORDER BY datetime DESC
      LIMIT 1;

    IF latest_record_time IS NULL THEN
      INSERT INTO SellsHistory (fid, fname, rname, category, avail, flimit, price, imgurl, datetime)
      VALUES (NEW.fid, NEW.fname, NEW.rname, NEW.category, NEW.avail, NEW.flimit, NEW.price, NEW.imgurl, curr_time);
      RETURN NEW;
    ELSE
      SELECT datetime INTO check_identical
      FROM SellsHistory
      WHERE fname = NEW.fname
      AND fid = NEW.fid
      AND rname = NEW.rname
      AND category = NEW.category
      AND avail = NEW.avail
      AND flimit = NEW.flimit
      AND imgurl = NEW.imgurl
      AND datetime = latest_record_time;

      IF check_identical IS NULL THEN 
        -- some change was made, add new record to SellsHistory
        INSERT INTO SellsHistory (fid, fname, rname, category, avail, flimit, price, imgurl, datetime)
        VALUES (NEW.fid, NEW.fname, NEW.rname, NEW.category, NEW.avail, NEW.flimit, NEW.price, NEW.imgurl, curr_time);
      END IF;
    END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sells_history_trigger on Sells CASCADE;

CREATE TRIGGER sells_history_trigger
  AFTER UPDATE OR INSERT
  ON Sells
  FOR EACH ROW
  EXECUTE FUNCTION
  sells_history_trigger();