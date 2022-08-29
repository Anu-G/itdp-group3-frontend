const SettingAccountService = ({doPut}) => {
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

    return {doUpdate};
}

export default SettingAccountService;