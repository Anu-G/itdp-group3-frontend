const PostService = ({doPost}) => {
    const doGetAccount = async (accountData) => {
        try {
            return await doPost({
                url: '/feed/account',
                data: accountData,
            })
        } catch (err) {
            throw err
        }
    }

    return {doGetAccount}
}

export default PostService;