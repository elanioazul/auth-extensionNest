import { CoffesPermission } from "../../coffes/coffes.permission";

export const Permission = {
	...CoffesPermission
};

export type PermissionType = CoffesPermission; // | ...other permission enums
