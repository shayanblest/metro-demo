import {PermissionDto} from '../../features/auth/DTOs/permission.dto';

export interface RoleModel {
  id: string;
  name: string;
  displayName: string;
  permissions?: PermissionDto[];
}
