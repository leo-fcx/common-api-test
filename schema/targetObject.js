module.exports = {
    "title":"Target Object schema v1",
    "type":"object",
    "required":[
        //
        // TODO: We need to differentiate between operations and defined its
        // required properties (i.e. add and delete have different properties)
        //
        // "companyId",
        // "companys",
        // "config_url_type",
        "email",
        "token",
        "name" // ,
        // "origin_server",
        // "origin_domain",
        // "role",
        // "tolerance"
    ],
    "properties":{
        "companyId":{
            "type":"string"
        },
        "companys":{
            "type":"string"
        },
        "config_url_type":{
            "type":"string"
        },
        "email":{
            "type":"string"
        },
        "token":{
            "type":"string"
        },
        "name":{
            "type":"string"
        },
        "origin_server":{
            "type":"string"
        },
        "origin_domain":{
            "type":"string"
        },
        "role":{
            "type":"string"
        },
        "tolerance":{
            "type":"string"
        }
    }
};
