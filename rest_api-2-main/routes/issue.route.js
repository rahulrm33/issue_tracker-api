const express = require('express')
const auth_middleware = require('../middlewares/auth.middleware');
const redis_middleware =require('../middlewares/redis.middleware');
const issue_controller = require('../controllers/issue.controller')
const router = new express.Router()

router.post('/issues', auth_middleware.verifyToken,issue_controller.createIssue);
router.get('/issues', auth_middleware.verifyToken, issue_controller.getAllIssue);
router.get('/issues/:id',auth_middleware.verifyToken,redis_middleware.cacheCheck ,issue_controller.getIssue);
router.get('/issue', auth_middleware.verifyToken,issue_controller.getByQuery);
router.get('/issue', auth_middleware.verifyToken,issue_controller.getByStatus)
router.patch('/issues/:id', auth_middleware.verifyToken,issue_controller.updateIssue);
router.delete('/issues/:id',auth_middleware.verifyToken,issue_controller.deleteIssue);

module.exports = router



/*const updates = Object.keys(req.body)
    
    const allowedUpdates = ['title','description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const issue = await Issue.findById(req.params.id)
        console.log(issue)
        updates.forEach((update) => issue[update] = req.body[update])
        console.log(issue)
        issue[updated_By]=req.user_id
        console.log(issue)
        await issue.save()

        if (!issue) {
            return res.status(404).send()
        }

        res.send(issue)
    } catch (e) {
        res.status(400).send(e)
    }*/



    // const a = await Issue.findById(id)
    //     console.log(a)
    //     const updatedPost = { title, description, completed, _id: id, updated_By:req.user_id ,updated_At:new Date(),created_By:a.created_By,created_At:a.created_At};
    //     console.log(updatedPost)
    //     await Issue.findByIdAndUpdate(id, updatedPost, { new: true });
    //     res.json(updatedPost);