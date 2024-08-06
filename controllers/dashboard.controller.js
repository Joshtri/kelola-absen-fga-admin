


export const dashboardPage = async(req,res)=>{
    const title = "Dashboard Page";

    try {
        res.render('dashboard',{
            title
        })
    } catch (error) {
        throw error;
    }
}