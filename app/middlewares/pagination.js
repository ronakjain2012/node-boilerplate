export async function pagination(req, res, next) {
    let paginationDetails = {
        page:0,
        limit: 50,
        orderBy: 'createdAt',
        orderAsc: false,
    };
    if(req.query.no_limit) {
        paginationDetails = null;
    } else {
        if(req.query.page){
            paginationDetails.page = parseInt(req.query.page<=1?0:req.query.page-1);
        }
        if(req.query.limit){
            paginationDetails.limit = parseInt(req.query.limit>0?req.query.limit:50);
        }
        if(req.query.orderBy){
            paginationDetails.orderBy = req.query.orderBy;
        }
        if(req.query.orderAsc){
            paginationDetails.orderAsc = req.query.orderAsc==false?-1:1;
        }
    }
    req.pagination = paginationDetails;
    res.pagination = paginationDetails;
    req.paginationProcess = function(model) {
        try {
            if(this.pagination !== null){
                let order = {};
                order[this.pagination.orderBy] = this.pagination.orderAsc;
                model.limit(this.pagination.limit)
                .skip(this.pagination.limit * this.pagination.page)
                .sort(order);
            }
        } catch(err) {
            console.log(err);
        } finally {
            return model;
        }
    };
    next();
}

export default pagination;