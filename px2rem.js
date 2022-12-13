/* 
    px和rem单位互转
    content: 样式表的内容
    unit: 需要替换的单位名称
    updateUnit: 替换后的单位名称
    rule: 
        单位换算规则，多少rem = px || px = rem
        例如：当rule为100时即表示 1rem = 100px
*/
function pxAndRemInterturn({content,unit,rule,updateUnit}){
    rule = rule || 37.5
    if(!rule)return content;
    const reg = {
        px : /[\:]*[\s]*[-]*[\s]*[0-9]*[\.]*[0-9]*\p\x/g,
        rem: /[\:]*[\s]*[-]*[\s]*[0-9]*[\.]*[0-9]*rem/g,
        number: /[0-9]*[\.]*[0-9]*/g
    }
    // 获取到所有匹配的内容
    const res = content.match(reg[unit])
    // 传进来的是正则匹配的结构内容
    function getRightData(arr){
        const result = []
        for(let  i = 0; i <arr.length;i++){
            result.push(Number(arr[i].replace(new RegExp(' ', "gm"), '').replace(':','').replace(unit,'')))
        }
        return result
    }
    const rightData = getRightData(res)
    
    // 单位换算
    function unitConversion({num,unit,updateUnit,rule}){
        let res = ''
        if(unit === 'px' && updateUnit === 'rem'){
            res = (num / rule).toFixed(3)
        }else if(unit === 'rem' && updateUnit === 'px'){
            res = (num * rule).toFixed(0)
        }
        return  ' ' + res + updateUnit
    }
    
    for(let i=0;i < rightData.length;i++){
        let txt = unitConversion({
            num:rightData[i],
            unit,
            updateUnit,
            rule
        })
        if(res[i].indexOf(':') >= 0){
            txt = ': '+ txt
        }
        content = content.replace(res[i],txt)
    }
    return content
}