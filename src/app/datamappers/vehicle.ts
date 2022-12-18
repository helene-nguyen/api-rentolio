//~ Import modules
import client from '../database/connect.js';
import { CoreDataMapper } from './coreDataMapper.js';

class VehicleDataMapper extends CoreDataMapper {
    tableName = 'vehicle';
    columns = ` "id","category_id", "brand_id", "reference", "is_booked"`;
    //Functions
    // createFunctionName = '';
    // updateFunctionName = '';
  }
  
  const Vehicle = new VehicleDataMapper(client);
  export { Vehicle };
  