const { Member } = require('../models/members');

exports.TargetMiddlware = async (ctx, next) => {

    if(ctx.update.message.reply_to_message){
        
        let member = await Member.find(ctx.update.message.reply_to_message.from.id);
        if(!member){
            let admins = await ctx.getChatAdministrators();
            member = await Member.create(data, admins);
        }

        ctx.target = {
            message_id: ctx.update.message.reply_to_message.message_id,
            member: member
        }
    }

    next();
};