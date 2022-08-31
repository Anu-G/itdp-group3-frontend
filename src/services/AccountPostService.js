const PostService = ({doPost}) => {
    const doGetAccount = async (accountData) => {
        try {
            return await doPost({
                url: '/account/feed',
                data: accountData,
            })
        } catch (err) {
            throw err
        }
    }

    return {doGetAccount}
}

export default PostService;