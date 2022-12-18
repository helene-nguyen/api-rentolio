//~ Import modules
import client from '../database/connect.js';
import { CoreDataMapper } from './coreDataMapper.js';

class RentalDataMapper extends CoreDataMapper {
    tableName = 'rental';
    columns = ` "id","user_id", "vehicle_id", "rent_at", "returned_at"`;
    //Functions
    createFunctionName = 'create_rental';
    updateFunctionName = 'update_rental';
  }
  
  const Rental = new RentalDataMapper(client);
  export { Rental };
  