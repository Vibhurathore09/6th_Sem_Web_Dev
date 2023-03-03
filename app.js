const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { v4: idid } = require('uuid');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 


let comments = [{
        id: idid(),
        user: "jhkssafdasdffasjdks",
        date: "soamdadsfsfasdfsjashdj",
        text: "this is vibhu's comment"
    },
    {
        id: idid(),
        user: "dhjds",
        date: "asdkja asndkjasd ajksdkjasd",
        text: "this is bifvhu's comment"
    },
    {
        id: idid(),
        user: "ksjjds",
        date: "asbdjas jfdkhfd djfjd",
        text: "this is b=vibhus's comment"
    },
    {
        id: idid(),
        user: "jhsjds",
        date: "fhksjdf dsjfksdf skdjfksd",
        text: "this is Ritvibhuche's comment"
    }
];


app.get('/comments', (req, res) => {
    res.render('index', { comments });
})


app.get('/comments/new', (req, res) => {
    res.render('new');
})

app.post('/comments', (req, res) => {
    const newComment = req.body;
    newComment.id = idid();

     comments.unshift(newComment);

    res.redirect('/comments');
})

app.get('/comments/:commentid', (req, res) => {
    const { commentid } = req.params;

    const comment = comments.find((comment) => comment.id === commentid);
    res.render('onlyComment', { comment });
})


app.get('/comments/:commentid/edit', (req, res) => {
    const { commentid } = req.params;

    const comment = comments.find((comment) => comment.id === commentid);
    res.render('edit', { comment });
})


app.patch('/comments/:commentid', (req, res) => {
    const { commentid } = req.params;

    const comment = comments.find((comment) => comment.id === commentid);
    comment.user = req.body.user;
    comment.date = req.body.date;
    comment.text = req.body.text;

    res.redirect('/comments');
})

app.delete('/comments/:commentid', (req, res) => {
    comments = comments.filter((comm) => comm.id != req.params.commentid);
    res.redirect('/comments');
})


app.listen(4000, () => {
    console.log("server listen at port 4000");
});