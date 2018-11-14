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

exports.DeleteForwarded = async (ctx, next) => {

    if(member.admin){
        next();
    }

    if (ctx.message && ctx.message.forward_from) {
        ctx.deleteMessage();

        if(member.warned){
            ctx.kickChatMember(member.id);
            member.banned = true;
            member.save();
        }else{
            member.warned = true;
            member.save();
        }
    }

    
}