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
        console.log(res.data);
        toast.update({ type : 'promise-resolved', text : "added new challenge" });
        return  { challenge : {...res.data.challenge,title,tags,description,total : 0, solved : 0} };
    } catch (error) {
        return Promise.reject();
    }
}

export const deleteChallengeApi = async({ privateAxios,id,toast })=>{
    try {
        await privateAxios.delete(`/challenges/${id}`);
        toast.update({ text : 'challenge deleted successfully ', type : 'promise-resolved' });
        return { id };
    } catch (error) {
        toast.update({ text : error?.data?.message || "some error occoured", type : 'promise-rejected' });
        return Promise.reject();
    }
}