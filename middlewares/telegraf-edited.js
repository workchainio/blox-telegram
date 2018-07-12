exports.ParseEdited = (ctx, next) => {
        if (ctx.updateType === 'edited_message') {
            ctx.update.message = ctx.update.edited_message;
        }
        next();       
};