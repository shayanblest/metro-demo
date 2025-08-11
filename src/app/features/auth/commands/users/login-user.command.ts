import {FormControl} from '@angular/forms';

export interface LoginUserCommand {
  userName: string;
  password: string;
  remember: boolean
}
