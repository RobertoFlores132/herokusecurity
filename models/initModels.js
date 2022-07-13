const { User } = require('./user.model');
const { Post } = require('./post.model');
const { Comment } = require('./comment.model');
const { PostImg } = require('./postImg.model');

const initModels = () => {

    User.hasMany(Post, {foreignKey: 'userId'});
    Post.belongsTo(User);

    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User);

    Post.hasMany(Comment, { foreignKey: 'postId' });
    Comment.belongsTo(Post);

    Post.hasMany(PostImg, { foreignKey: 'postId' });
    PostImg.belongsTo(Post);
}

module.exports = { initModels };