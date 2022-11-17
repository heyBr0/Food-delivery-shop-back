export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    console.log(req.user.role);
    next();
  } else {
    console.log(req.params.id, req.user._id.toString());
    if (
      req.user._id.toString() === req.params.id ||
      req.user.orders.includes(req.params.id)
    ) {
      next();
    } else {
      const error = new Error("unauthorized access");
      error.status = 403;
      next(error);
    }
  }
};
