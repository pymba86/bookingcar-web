import {Auth} from '../../auth/models/auth.model';

export interface User extends Auth {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: Boolean;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}
