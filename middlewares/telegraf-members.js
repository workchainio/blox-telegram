const { Member } = require('../models/members');

exports.MembersMiddlware = async (ctx, next) => {
    
    if(ctx.updateSubTypes.includes('new_chat_members')){
        ctx.update.message.new_chat_members.forEach(async data => {
            let admins = await ctx.getChatAdministrators();
            member = await Member.create(data, admins);
        })
    }
    
    if(ctx.update && ctx.update.message && ctx.update.message.from){

        const data = ctx.update.message.from;
        let member = await Member.find(data.id);

        if(!member){
            let admins = await ctx.getChatAdministrators();
            member = await Member.create(data, admins);
        }

        ctx.member = member;
        next();
    }
};