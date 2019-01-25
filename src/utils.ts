
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