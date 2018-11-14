const { LockChat } = require('./telegraf-lock-chat');
const { TargetMiddlware } = require('./telegraf-target');
const { MembersMiddlware } = require('./telegraf-members');
const { ParseEdited } = require('./telegraf-edited');
const { AdminOnly, IgnoreAdmin, DeleteForwarded } = require('./telegraf-basic');

module.exports = {
    LockChat,
    MembersMiddlware,
    TargetMiddlware,
    ParseEdited,
    AdminOnly,
    IgnoreAdmin,
    DeleteForwarded
}