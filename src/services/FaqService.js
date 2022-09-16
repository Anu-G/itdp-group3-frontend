export const FaqService = ({doPost}) => {
    const doCreateFaq = async (data) => {
        try {
            return await doPost({
                url:'/faq/add/faq',
                data: data
            })
        } catch (e) {
            throw e
        }
    }
    const doGetFaq = async (data) => {
        try {
            return await doPost({
                url:'/faq/get/faq',
                data: data
            })
        } catch (e) {
            throw e
        }
    }
    const doDeleteFaq = async (data) => {
        try {
            return await doPost({
                url:'/faq/delete/faq',
                data: data
            })
        } catch (e) {
            throw e
        }
    }

    return {doCreateFaq,doGetFaq,doDeleteFaq};
}