module.exports = {
    generateDomainObject: function(name, companyId){
        return {
            "name": "domain" + name + ".com",
            "origin_server": "domain" + name + ".com",
            "origin_server_location": "Amsterdam, NL",
            "companyId": companyId,
            "origin_host_header": "www.domain" + name + ".com",
            "tolerance": "4000"
        }
    }
}
