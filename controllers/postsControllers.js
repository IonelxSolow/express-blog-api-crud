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
  res.send('crea un post')
}
function update(req, res) {
  res.send(`Aggiorna il post con id: ${req.params.id}`)
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

