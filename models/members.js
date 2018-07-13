const Redis = require('redis');
const Promise = require("bluebird");

Promise.promisifyAll(Redis.RedisClient.prototype);
const redis = Redis.createClient();

class Member {

    constructor(data){
        Object.assign(this, data);
    }

    async save(){
        return redis.hmsetAsync('members', this.id, JSON.stringify(this));
    }

    async remove(){
        redis.hdelAsync('members', this.id);
    }

	static async find(id) {
        let data = await redis.hgetAsync('members', id);
        if(data){
            return new Member(JSON.parse(data));
        }else{
            return null;
        } 
    }

    static async findAll() {
        const all = await redis.hgetallAsync('members');
        return Object.keys(all).map( key => new Member(JSON.parse(all[key])));
    }
    
    static async clear() {
        await redis.delAsync('members');
    }

    static async create(data, admins) {
        let member = new Member(data);

        if(member.first_name && member.last_name){
            member.full_name = `${member.first_name} ${member.last_name}`;
        }else if(member.first_name){
            member.full_name = member.first_name;
        }else{
            member.full_name = member.username;
        }

        member.full_name = `${member.first_name} ${member.last_name? member.last_name : ''}`;
        member.joined = Date.now();
        member.new = true;
        member.admin = admins.reduce((value, admin) => {return value || (admin.user.id === member.id)}, false);
        member.warned = false;
        member.banned = false;
        await member.save();
        return member;
    }
        
}

exports.Member = Member;