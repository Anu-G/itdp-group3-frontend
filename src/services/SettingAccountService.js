const SettingAccountService = ({ doPut }) => {
    const doUpdate = async (accountData) => {
        try {
            return await doPut({
                url: '/user/update',
                data: accountData
            })
        } catch (err) {
            throw err
        }
    }

    const doActivateBusiness = async (accountId) => {
        try {
            return await doPut({
                url: '/account/activate-business',
                data: accountId
            });
        } catch (err) {
            throw err;
        }
    }

    return { doUpdate, doActivateBusiness };
}

export default SettingAccountService;