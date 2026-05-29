import client from "../Redis/redis.js";

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

async function getcache(key){
    try{
        const data = await client.get(key);
        return data;
    }catch(err){
        throw new Error(err.message);   
    }
}

async function setcache(key,value,time){
    try{
        await client.del("students");

        const data= await client.set(key, JSON.stringify(value), {"EX" : time});
        return data;
    }catch(err){
        throw new Error(err.message);
    }
}

async function deletecache(key){
    try{
        await client.del(key);

    }catch(err){
        throw new Error(err.message);
    }
}

async function updatecache(key,value,time){
    try{
        await client.del("students");

        const data= await client.set(key, JSON.stringify(value), {"EX" : time});
        return data;
    }catch(err){
        throw new Error(err.message);
    }
}

async function getTTL(key){
    try{
        const ttl =await client.ttl(key);
        return ttl > 0 ? ttl : null;
    }catch(err){
        throw new Error(err.message);
    }
}

// async function lst(key,limit,offset){
//     


export { getInBulk, getcache, setcache, deletecache, updatecache, getTTL,lst };
