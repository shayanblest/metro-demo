export interface JwtPayload {
  id: string;
  fullName: string;
  username: string;
  roles: string[];
  permissions: string[];
  roleDisplayName: string;
  countyId?: number;
  provinceId?: number;
}
