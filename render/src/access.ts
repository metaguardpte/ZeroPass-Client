/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
    currentUser?: API.UserProfile & Partial<API.domain>;
}) {
    return {
        PersonalUser: true,
    };
}
