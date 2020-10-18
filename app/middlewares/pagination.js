async function pagination(req, res, next) {
  let paginationDetails = {
    page: 0,
    limit: 50,
    orderBy: 'createdAt',
    orderAsc: false,
  };
  if (req.query.noLimit==1) {
    paginationDetails.limit = 99999999;
  } else {
    if (req.query.page) {
      paginationDetails.page = parseInt(
        req.query.page <= 1 ? 0 : req.query.page - 1,
      );
    }
    if (req.query.limit) {
      paginationDetails.limit = parseInt(req.query.limit > 0 ? req.query.limit : 50);
    }
  }
  if (req.query.orderBy) {
    paginationDetails.orderBy = req.query.orderBy;
  }
  if (req.query.orderAsc) {
    paginationDetails.orderAsc = req.query.orderAsc == 0 ? -1 : 1;
  }
  req.pagination = paginationDetails;
  res.pagination = paginationDetails;
  res.routePath = req.route.path + '::' + req.originalUrl;
  let cacheKey = '';
  if (req.User) {
    cacheKey = req.User._id + '::';
  }
  res.cacheKey = cacheKey + res.routePath;

  req.paginationProcess = function (model) {
    try {
      if (this.pagination !== null) {
        let order = {};
        order[this.pagination.orderBy] = this.pagination.orderAsc;
        model
          .limit(this.pagination.limit)
          .skip(this.pagination.limit * this.pagination.page)
          .sort(order);
      }
    } catch (err) {
      console.log(err);
    } finally {
      return model;
    }
  };
  next();
}

module.exports = pagination;
