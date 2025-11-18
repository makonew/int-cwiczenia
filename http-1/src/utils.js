const fs = require("fs");

function readFileToJson(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const json = JSON.parse(data);
        return json;
    } catch (err) {
        console.error("Error:", err);
    }
}

function mapRouteToPattern(route, pattern) {
    const [request, parameters] = route.startsWith("?")?[0, route]:route.split("?")
    const segments = request.split("/")
    const _pattern = pattern.split("/")

    const splitRoute = {}
    segments.forEach((segment, index) => {
        splitRoute[_pattern[index] || index] = segment
    })

    const parameterDictionary = {}
    if(!!parameters && parameters !== "")
    parameters.split("&").forEach((parameter) => {
        if(parameter.startsWith("="))
            return;
        const [key, value] = parameter.split("=")

        parameterDictionary[key] = value || "";
    })

    return {
        url: splitRoute,
        parameters: parameterDictionary
    };
}

module.exports = {
    readFileToJson,
    mapRouteToPattern
}