import { Role } from "src/users/enums/role.enum";
import { PermissionType } from "../authorization/permission.type";

export interface IActiveUser {
    /**
     * The "subject" of the token. The value of this property is the user ID
     * that granted this token.
     */
    sub: number;
  
    /**
     * The subject's (user) email.
     */
    email: string;
    /**
   * The subject's (user) role.
   */
    role: Role; 

    permissions: PermissionType[];
  }