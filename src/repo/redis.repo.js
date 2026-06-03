//imports
import client from "../Redis/redis.js";
// Redis functions for attendance management
// set attendance

async function getInBulk(keys){
    try{
        const data = await client.mGet(keys);

        if(data.length ===0){
            return null;
        }
        return data.filter((value)=> {
            return value !==null;
        })
    }catch(err){
        throw new Error(err.message);
    }
    
}
// get cache
async function getcache(key){
    try{
        const data = await client.get(key);
        return data;
    }catch(err){
        throw new Error(err.message);   
    }
}
// set cache
async function setcache(key,value,time){
    try{
        await client.del("students");

        const data= await client.set(key, JSON.stringify(value), {"EX" : time});
        return data;
    }catch(err){
        throw new Error(err.message);
    }
}
// delete cache
async function deletecache(key){
    try{
        await client.del(key);

    }catch(err){
        throw new Error(err.message);
    }
}
// update cache
async function updatecache(key,value,time){
    try{
        await client.del("students");

        const data= await client.set(key, JSON.stringify(value), {"EX" : time});
        return data;
    }catch(err){
        throw new Error(err.message);
    }
}
// get TTL
async function getTTL(key){
    try{
        const ttl =await client.ttl(key);
        return ttl > 0 ? ttl : null;
    }catch(err){
        throw new Error(err.message);
    }
}

    


export { getInBulk, getcache, setcache, deletecache, updatecache, getTTL };
