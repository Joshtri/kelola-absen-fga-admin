


export const loginPage = async(req,res)=>{
    try {
        res.render('index',{
            title:'Login Page',
            
        })
    } catch (error) {
        throw error;
    }
}