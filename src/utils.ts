
export function updateWith<T>(origObj: T, updateObj: T): T
{
    let result: T = origObj;
    for (const key in Object.keys(updateObj)) {
        if (typeof(key) != 'undefined') {
            result[key] = updateObj[key];                
        }
    }
    return result;
}

/*
export function castCaseInsensitive<T>(objLiteral: any, dummyObject:T ): T
{
    let result: T = dummyObject;
    let literalKeys: string[] =  Object.keys(objLiteral);
    for (const key in result) {
        let equivalentKey = literalKeys.find(literalKey => literalKey.toLowerCase() === key.toLowerCase())
        result[key] = objLiteral[equivalentKey];
    }        
    return result;
}
*/