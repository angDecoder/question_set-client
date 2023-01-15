export const getAllChallengesApi = async ({ privateAxios, controller,toast }) => {
    try {
        const res = await privateAxios.get('/challenges', {
            signal: controller.signal
        });
        toast.update({ type : 'promise-resolved', text : 'all challenges received' });
        // console.log(res.data);
        return { data : res.data.challenges };
    } catch (error) {
        toast.update({ type : 'promise-rejected', text : error.response.data.message || "failed to fetch data" });
        return Promise.reject();
    }
}

export const addNewChallengeApi = async({ privateAxios,title,tags,description,toast })=>{
    try {
        const res = await privateAxios.post(
            '/challenges/add',
            {title,tags,description}
        );
        // console.log(res.data);
        toast.update({ type : 'promise-resolved', text : "added new challenge" });
        return  { challenge : res.data.challenge };
    } catch (error) {
        return Promise.reject();
    }
}