var path = require("path");
const fs = require("fs");
const files = fs.readdirSync('./src').sort((f1, f2) => {
    const f1Num = Number(f1.split('.')[0]);
    const f2Num = Number(f2.split('.')[0]);
    return f1Num - f2Num;
});
const templateData = fs.readFileSync('./README-TEMPLATE.md');
const data = files
    .map((fileName) => (
        '### ' + fileName.split('.js')[0] + `<a href="./src/${fileName}" style="float:right;opacity:0.5;" target="_blank">📝</a>` + '\r\n\r\n' +
        `<details>\r\n<summary>展开代码、题解</summary>\r\n\r\n\`\`\`js\r\n${fs.readFileSync('./src/' + fileName)}\r\n\`\`\`\r\n</details>\r\n`
    ))
    .join('\r\n')
fs.writeFileSync('./README.md', templateData + data);
