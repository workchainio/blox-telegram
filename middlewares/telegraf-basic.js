exports.AdminOnly = async (ctx, next) => {

    ctx.deleteMessage();

    if (!ctx.member.admin) {
        ctx.deleteMessage();
        ctx.reply('Only admins are allowed to send commands!');
        return;
    }

    if(!ctx.target){
        return;
    }
    
    next();
}

exports.IgnoreAdmin = async (ctx, next) => {

    if (ctx.member.admin) {
        console.log('Ignore from admin:', ctx.member.full_name);
        return;
    }

    next();
}