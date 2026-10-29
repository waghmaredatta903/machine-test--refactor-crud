let blogs = require("../data/data")

function sentBlogs(req, res){
    try{
        res.status(200).json({
            success : true,
            data : blogs,
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message :  `Something Went Wrong.....!!!!`,
            error : err.message
        })

    }
}
function sentBlogsById(req, res){
    try{
        let BlogsId = req.params.id
        let blog = blogs.find(b => b.id === BlogsId)
        if(!blog){
            return res.status(404).json({
                success : false,
                message : `Blogs with  ${BlogsId} id not found...!`
            })
        }
        res.status(200).json({
            success : true,
            message : `Blogs is fetched Successfully...!!!`,
            data : blog
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `Something went Wrong...!`,
            error : err.message
        })

    }
}

function createBlogs(req,res){
    try{
        let body = req.body
        if(!body.title || !body.content){
            return res.status(404).json({
                success : false,
                message : `Title and Content is not found..!!!`
            })
        }
        let newObj = {
            title : body.title,
            content : body.content,
            userid : body.userid,
            id : Date.now().toString()
        }
        blogs.push(newObj)
        res.status(201).json({
            success : true,
            message : `New Blog is Created Successfully...!!!`,
            data : newObj
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `Something Went Wrong....!!!`
        })
    }
}

function UpdateBlogs(req,res){
    try{
        let UpdateId = req.params.id;
        let body = req.body;
        let blogIndex = blogs.findIndex(b => b.id === UpdateId )
        if(!blogIndex === -1){
            return res.status(404).json({
                success : false,
                message :`Blog with id ${UpdateId} is not found...!!!! `
            })
        }
        if(!body.title || !body.content){
            return res.status(404).json({
                success : false,
                message : `Title and Contentis not found.!!!!`
            })
        }
        let UpdateObj = {
            ...blogs[blogIndex],
            title : body.title,
            content : body.content
        }
        blogs[blogIndex] = UpdateObj;

        res.status(200).json({
            success : true,
            message : `Blog is updated Successfully...!!!`
        })
    }catch(err){
        res.status(500).json({
            success : true,
            message : `Something went wrong..!!!!`,
            error : err.message
        })

    }
}

function RemoveBlogs(req, res){
    try{
        let removeId = req.params.id;
        let removeIndex = blogs.findIndex(b => b.id === removeId)
        if(!removeIndex === -1){
            return res.status(404).json({
                success : false,
                message : `Remove id is not found...!!!!`
            })
        }
        let RemoveBlogs = blogs.splice(removeIndex, 1)
        res.status(200).json({
            success : true,
            message : `Blog is removed Successfully...!!!!`,
            data : RemoveBlogs[0]
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `Something went Wrong...!!!`
        })
    }
}

module.exports = {
    sentBlogs,
    sentBlogsById,
    createBlogs,
    UpdateBlogs,
    RemoveBlogs
}