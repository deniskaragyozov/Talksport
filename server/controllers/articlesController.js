const { userModel, articleModel } = require('../models');

function getAll(req, res, next) {
    articleModel.find()
        .populate('userId')
        .then(articles => res.json(articles))
        .catch(next);
}

function createArticle(req, res, next) {
    const { title, imageUrl, description } = req.body;
    //TODO add auth
    //const { _id: userId } = req.user;

    articleModel.create({ title, imageUrl, description })
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
    const articleId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: articleId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}



module.exports = {
    getAll,
    createArticle,
    getArticle,
    likeArticle
}
