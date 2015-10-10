var constants = {
    BASE_URL: 'CHANGE_ME',
    USER: 'CHANGE_ME',
    PASSWORD: 'CHANGE_ME'
};

module.exports = {
    get: function(key){
        return constants[key];
    }
};
