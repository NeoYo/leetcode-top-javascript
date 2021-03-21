// 控制台操作全局~~~ 
// 展开全部 
function allOpen() { 
    document
        .querySelectorAll('h3+details')
        .forEach((node) => { 
            node.setAttribute('open', true);
        }); 
} 
// 收起全部
function allClose() { 
    document
        .querySelectorAll('h3+details')
        .forEach((node) => {
            node.removeAttribute('open'); });
}

allClose();