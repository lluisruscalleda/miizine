/**
 * Created by lluis on 25/01/2017.
 */
module.exports = function BaseModelModel(BaseModel) {
  BaseModel.observe('after save', (ctx, next) => {
    const context = ctx;
    if (context.isNewInstance) {
      context.instance = Date.now();
    }

    context.updatedAt = Date.now();
    next();
  });
};

