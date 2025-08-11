import {PermissionDto} from '../../DTOs/permission.dto';

export interface EditRoleCommand {
  id?: string;
  name: string;
  displayName: string;
  permissions?: PermissionDto[];
}
