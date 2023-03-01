import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../../../../users/enums/role.enum";
import { REQUEST_USER_KEY } from "../../../iam.constants";
import { IActiveUser } from "../../../interfaces/active-user.interface";
import { PERMISSIONS_KEY } from "../../decortators/permissions.decorator";
import { ROLES_KEY } from "../../decortators/role.decorator";
import { PermissionType } from "../../permission.type";

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const contextPermissions = this.reflector.getAllAndOverride<
			PermissionType[]
		>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
		if (!contextPermissions) {
			return true;
		}
		const user: IActiveUser = context.switchToHttp().getRequest()[
			REQUEST_USER_KEY
		];
		return contextPermissions.every(
			(
				permission // 👈 use of .every() diff than roles guard
			) => user.permissions?.includes(permission)
		);
	}
}
