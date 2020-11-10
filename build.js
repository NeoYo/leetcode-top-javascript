
var path = require("path");
const fs = require("fs");
const files = fs.readdirSync('./src');
const templateData = fs.readFileSync('./README-TEMPLATE.md');
const data = files
    .map((fileName) => (
        '### ' + fileName.split('.js')[0] + `<a href="./src/${fileName}" style="float:right;opacity:0.5;">🖋</a>` + '\r\n\r\n' +
        `<details>\r\n<summary>展开代码、题解</summary>\r\n\r\n\`\`\`js\r\n${fs.readFileSync('./src/' + fileName)}\r\n\`\`\`\r\n</details>\r\n`
    ))
    .join('\r\n')
fs.writeFileSync('./README.md', templateData + data);
