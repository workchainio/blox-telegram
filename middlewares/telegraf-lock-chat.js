exports.LockChat = (chat_id) => {
    return async (ctx, next) => {
        if(ctx.update.message.chat.id === chat_id){
            next();
        }        
    }
};