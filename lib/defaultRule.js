module.exports = {
    'required': {
        regexp: /\S/,
        be: true,
        msg: '请输入{{name}}'
    },
    'email': {
        regexp: /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,
        be: true,
        msg: '{{name}}的格式不正确'
    },
    'url': {
        regexp: /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        be: true,
        msg: '{{name}}的格式不正确'
    },
    'mobile': {
        regexp: /^1\d{10}$/,
        be: true,
        msg: '请输入正确的{{name}}'
    }
}
