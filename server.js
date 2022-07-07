const { app } = require('./app');

//Models
const { User } = require('./models/user.model');
const { Post } = require('./models/post.model');
const { Comment } = require('./models/comment.model')

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User);

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User);

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post);

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('Express app running!!');
});