export interface PermissionDto {
  resourceName: string;
  resource: string;
  actions: {
    C: boolean;
    R: boolean;
    U: boolean;
    D: boolean;
  };
}

export interface PermissionResource {
  name: string;
  displayName: string;
}

export const PERMISSION_RESOURCES : PermissionResource[] = [
  { name: "Posts", displayName: "نوشته ها" },
  { name: "Documents", displayName: "مدارک" },
  { name: "Users", displayName: "کاربران" },
  { name: "Roles", displayName: "نقش ها" },
]

