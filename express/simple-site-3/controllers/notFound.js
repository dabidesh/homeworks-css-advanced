module.exports = {
  notFound(req, res) {
    res.status(404).render('404', {
      layout: 'errorLayout',
      title: 'Page Not Found 404',
      description: 'Page Not Found or not exist 404'
    });
  }
};