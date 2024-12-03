const getCurrentData = (key = "", defaultContent = "[]") => {
    try {
        let data = localStorage.getItem(key);
        // db's key is not exists on localStorage
        if (data == null) {
            localStorage.setItem(key, defaultContent);
            return [];
        }
        return JSON.parse(data);
    } catch (err) {
        localStorage.setItem(key, defaultContent);
        return [];
    }
}

const saveData = (key = "", data = []) => {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
}

export {
    getCurrentData,
    saveData
}