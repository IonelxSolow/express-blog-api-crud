const postsData = require('../data/postsData')


function index(req, res) {
  let filteredPost = postsData;
  /*   console.log(req); */
  if (req.query.tags) {
    /*  console.log('filter the result') */
    filteredPost = postsData.filter(post => post.tags.includes(req.query.tags))
    //http://localhost:3000/posts?tags=Torte
  }
  res.json(filteredPost);
}

function show(req, res) {
  const postSlug = req.params.slug
  const findPost = postsData.find(post => post.slug === postSlug)
  if (!findPost) {
    return res.status(404).json({
      error: '404 Not Found',
      message: 'Post not found'
    })
  }
  res.json(findPost)
}

function create(req, res) {
const title = req.body.title;
const newSlug = title.toLowerCase().replace(/\s+/g, '-'); 

const newPost = {
  title: title,
  slug: newSlug,
  content: req.body.content,
  image: req.body.image,
  tags: req.body.tags
}

postsData.push(newPost);

console.log(postsData)

res.status(201);
res.json(newPost)

 /*  res.send('crea un post') */
}

function update(req, res) {
  const postSlug = req.params.slug
  const findPost = postsData.find(post => post.slug === postSlug)
  if (!findPost) {
    return res.status(404).json({
      error: '404 Not Found',
      message: 'Post not found'
    })
  }
  findPost.title = req.body.title;
  findPost.slug = req.body.slug;
  findPost.image = req.body.image;
  findPost.tags = req.body.tags;

  console.log(findPost)

  res.json(findPost)
  /* res.send(`Aggiorna il post con id: ${req.params.id}`) */
}

function modify(req, res) {
  res.send(`modificato il post con id: ${req.params.id}`)
}

function destroy(req, res) {
  const postSlug = req.params.slug
  const findPost = postsData.find(post => post.slug === postSlug)
  if (!findPost) {
    return res.status(404).json({
      error: '404 Not Found',
      message: 'Post not found'
    })
  }

  const postIndex = postsData.indexOf(findPost);

  if (postIndex !== -1) {
    postsData.splice(postIndex, 1);
    res.sendStatus(204);
  }
  console.log(postsData)

}


module.exports = {
  index,
  show,
  create,
  update,
  modify,
  destroy
};

