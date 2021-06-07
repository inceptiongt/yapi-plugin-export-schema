var JSZip = require("jszip");
var fs = require("fs")
var zip = new JSZip();

function toZip(data = []) {
    data.forEach(e => {
        const { list: coll = [] } = e
        coll.forEach(interface => {
            const { path = '', req_body_is_json_schema, res_body_is_json_schema, res_body, req_body_other } = interface;
            const _path = path.replace(/\//g,'_')
            if (res_body_is_json_schema) {
                zip.file(`${_path}_res.json`, res_body)
            }
            if (req_body_is_json_schema) {
                zip.file(`${_path}_req.json`, req_body_other)
            }
        });
    })

    return zip
    .generateNodeStream({type:'nodebuffer',streamFiles:true})
}

module.exports = toZip