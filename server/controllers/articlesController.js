const { userModel, articleModel } = require('../models');

function getAll(req, res, next) {
    articleModel.find()
        .sort({created_at: "desc"})
        .populate('userId')
        .then(articles => res.json(articles))
        .catch(next);
}

function createArticle(req, res, next) {
    const { title, imageUrl, description, user } = req.body;
    const { _id: userId } = req.user;

    articleModel.create({ title, imageUrl, userId, description, user })
        .then(article => res.status(200).json(article))
        .catch(next)
}

function getArticle(req, res, next) {
    const { articleId } = req.params;

    articleModel.findById(articleId)
        .then(artcile => res.json(artcile))
        .catch(next);

}

function likeArticle(req, res, next) {
    const { articleId } = req.body;
    const { _id: userId } = req.user;
    articleModel.findByIdAndUpdate({ _id: articleId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedArticle => {
            res.status(200).json(updatedArticle)
        })
        .catch(next);
}

function editArticle(req, res, next) {
    const { articleId } = req.params;
    const { title,description,imageUrl } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    articleModel.findOneAndUpdate({ _id: articleId, userId }, { title, imageUrl, description}, { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteArticle(req, res, next) {
    const { articleId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        articleModel.findOneAndDelete({ _id: articleId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { articles: articleId } }),

    ])
        .then((deletedOne) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}


module.exports = {
    getAll,
    createArticle,
    getArticle,
    likeArticle,
    editArticle,
    deleteArticle
}
