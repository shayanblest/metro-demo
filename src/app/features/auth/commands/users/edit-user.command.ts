export interface EditUserCommand {
  id: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  password: string;
  description?: string;
  role: string;
}
