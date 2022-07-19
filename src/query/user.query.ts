import { GqlContext } from "../gql/GqlContext";
import { User } from "../model/user";
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";
import { me, UserResult } from "../controller/user.controller";


export const meMutation = async (
    obj: any,
    args: null,
    ctx: GqlContext,
    info: any
): Promise<User | EntityResult> => {
    let user: UserResult;
    try {
        if (!ctx.req.session?.userId) {
            return {
                messages: ["User not logged in."],
            };
        }
        user = await me(ctx.req.session.userId);
        if (user && user.user) {
            return user.user;
        }
        return {
            messages: user.messages ? user.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        throw ex;
    }
}