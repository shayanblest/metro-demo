

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
  nationalCode?: string;
}
