export const getAllQuestionApi = async ({ id,privateAxios })=>{
    try {
        const res = await privateAxios.get(
            '/question',
            {
                headers : { challenge_id : id }
            }
        );

        // console.log(res);

        return { questions : res.data.questions,id };
    } catch (error) {
        console.log(error);
    }
};

export const addNewQuestionApi = async ({ id,privateAxios,title,description,tags,link,toast })=>{
    try {
        const res = await privateAxios.post(
            '/question',
            { title,description,tags,link },
            {
                headers : { challenge_id : id }
            }
        );
        toast.update({ type : 'promise-resolved', text : 'new question added' });
        return { id, question: res.data.question };
    } catch (error) {
        toast.update({ type : 'promise-rejected', text : error?.data?.message || "some error occured" });
    }
}