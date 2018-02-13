function handle400(ctx, msg) {
  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg,
  };
}

module.exports = {
  handle400,
};
