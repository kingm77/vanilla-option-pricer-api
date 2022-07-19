import { register, login, logout, changePassword, UserResult, edit } from "../controller/user.controller";
import { GqlContext } from "../gql/GqlContext";
import { STANDARD_ERROR } from "../common/commonValue";

export const registerMutation = async (
    obj: any,
    args: { email: string; firstname: string; lastname: string; password: string },
    ctx: GqlContext,
    info: any
): Promise<string> => {
    let user: UserResult;
    try {
        user = await register(args.email, args.firstname, args.lastname, args.password);
        if (user && user.user) {
            return "Registration successful.";
        }
        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
    } catch (ex) {
        throw ex;
    }
}

export const loginMutation = async (
    obj: any,
    args: { email: string; password: string },
    ctx: GqlContext,
    info: any
): Promise<string> => {
    let user: UserResult;
    try {
        user = await login(args.email, args.password);
        if (user && user.user) {
            ctx.req.session!.userId = user.user.id;

            return `Login successful for userId ${ctx.req.session!.userId}.`;
        }
        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
    } catch (ex: any) {
        console.log(ex.message);
        throw ex;
    }
}

export const logoutMutation = async (
    obj: any,
    args: { email: string },
    ctx: GqlContext,
    info: any
): Promise<string> => {
    try {
        let result = await logout(args.email);
        ctx.req.session?.destroy((err: any) => {
            if (err) {
                console.log("destroy session failed");
                return;
            }
            console.log("session destroyed", ctx.req.session?.userId);
        });
        return result;
    } catch (ex) {
        throw ex;
    }
}

export const changePasswordMutation = async (
    obj: any,
    args: { newPassword: string },
    ctx: GqlContext,
    info: any
): Promise<string> => {
    try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
            return "You must be logged in before you can change your password.";
        }
        let result = await changePassword(
            ctx.req.session!.userId,
            args.newPassword
        );

        return result;
    } catch (ex) {
        throw ex;
    }
}

export const editMutation = async (
    obj: any,
    args: { newFirstname: string, newLastname: string },
    ctx: GqlContext,
    info: any
): Promise<string> => {
    try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
            return "You must be logged in before you can edit your profile.";
        }
        let result = await edit(
            ctx.req.session!.userId,
            args.newFirstname,
            args.newLastname
        );

        return result;
    } catch (ex) {
        throw ex;
    }
}