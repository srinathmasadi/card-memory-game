const requireAdmin = async (req, res, next) => {
    try {
      if (req.user && req.user.isAdmin) {
        next(); // allow the user to access the route
      } else {
        res.status(401).send('User is not an admin'); // send an error message if the user is not an admin
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error'); // handle any server errors that may occur
    }
  };
  
  module.exports = requireAdmin ;
  