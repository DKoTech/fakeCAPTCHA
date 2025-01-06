/*
fakeCAPTCHAPlus Project
:author:DKoTechnology
*/
//获取当前 JS 文件所在目录
var path = document.querySelectorAll("script")[document.querySelectorAll("script").length - 1].src.slice(0, -11);
//初始化验证器
function CAPTCHA(config) {
    // 传递自身
    var self = this;

    // 设置验证器状态
    this.checked = false;

    // 往 head 里灌 css
    var head = document.getElementsByTagName("head") [0]
    if (head.innerHTML.indexOf('rel="stylesheet"') == -1) {
        head.innerHTML += '<link rel="stylesheet" href="' + path + '/src/stylesheet.css">'
    }

    // 填充验证器元素
    document.querySelector(config.element).classList.add("captcha");
    document.querySelector(config.element).innerHTML = `<div class="captcha-clickable">
        <div class="captcha-checkbox"></div>
        <svg class="captcha-icon captcha-spinner" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#448AFF">
            <path
                d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
        </svg>
        <svg class="captcha-icon captcha-success" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#4CAF50">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
        <svg class="captcha-icon captcha-failure" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#F44336">
            <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
        <div class="captcha-text">` + config.textBefore + `</div>
    </div>`

    // 判断是否使用 reCAPTCHA 的 Logo
    var reCAPTCHA_information = `<a class="captcha-mark" target="_blank" href="https://www.google.com/recaptcha/about/">
        <div class="captcha-mark-text">reCAPTCHA</div>
        <img class="captcha-mark-logo" src="` + path + `/src/reCAPTCHA.png" alt="reCAPTCHA">
    </a>`;

    var fakeCAPTCHA_information = `<a class="captcha-mark" target="_blank" href="https://github.com/DKoTech/fakeCAPTCHA">
        <div class="captcha-mark-text">fakeCAPTCHA</div>
        <img class="captcha-mark-logo" src="` + path + `/src/fakeCAPTCHA.png" alt="fakeCAPTCHA">
    </a>`;

    if (config.Replace) {
        document.querySelector(config.element).innerHTML += reCAPTCHA_information;
    }
    else {
        document.querySelector(config.element).innerHTML += fakeCAPTCHA_information;
    }

    // 改动：删除 fakeCAPTCHA 的标识，彻底伪装为 reCAPTCHA.

    // 检测深色主题
    if (config.dark) {
        document.querySelector(config.element).classList.add("captcha-dark");
    }

    // 绑定点击事件
    document.querySelector(config.element + " .captcha-clickable").onclick = function () {
        // 寻找所需元素
        var checkbox = document.querySelector(config.element + " .captcha-checkbox");
        var spinner = document.querySelector(config.element + " .captcha-spinner");
        var success = document.querySelector(config.element + " .captcha-success");
        var failure = document.querySelector(config.element + " .captcha-failure");
        var text = document.querySelector(config.element + " .captcha-text");
        
        // 避免重复验证
        if (!self.checked) {
            // 开始验证过程
            checkbox.style.borderRadius = "50%";
            checkbox.style.transform = "scale(0)";
            checkbox.style.outlineWidth = "4px";
            window.setTimeout(function () {
                spinner.style.opacity = "1";
                text.innerHTML = config.textDuring;
                window.setTimeout(function () {
                    if (config.success) {
                        success.style.transform = "scale(1.5)";
                    } else {
                        failure.style.transform = "scale(1.5)";
                    }
                    spinner.style.opacity = 0;
                    text.innerHTML = config.textAfter;
                    self.checked = true;
                }, config.duration);
            }, 150);
        }
    }
}

class CAPTCHAElementNotFound extends Error {
    /* 
    CAPTCHAElementNotFound: fakeCAPTCHA+
    */
    constructor(message) {
      super(message); // 调用父类的构造函数
      this.name = "CAPTCHAElementNotFound"; // 设置错误名称
    }
} 

function WordCAPTCHA(config) {
    /* 
    WordCAPTCHA: fakeCAPTCHA+
    config: {
        CaptchaElement: "[CaptchaElement]",
        CaptchaSuccess: [bool: IsSuccess],
        CaptchaDuration: [int: Duration],
    }
    */
    // 检查状态
    this.checked = false;

    // 检测 head 里面是否有 css 再灌
    var head = document.getElementsByTagName("head") [0];
    if (head.innerHTML.indexOf('rel="stylesheet"') == -1) {
        head.innerHTML += '<link rel="stylesheet" href="' + path + '/src/stylesheet.css">';
    }

    // 寻找验证器元素
    this.captcha_element = document.querySelector(config.CaptchaElement);
    if (this.captcha_element == null) {
        // 找不到就直接罢工
        throw new CAPTCHAElementNotFound("无法在页面中找到对象：" + config.CaptchaElement + "。\nCould find object: " + config.CaptchaElement + ".");
    }

    // 随机单词图片
    var pictures = ["kite", "slide"];
    var randomPicture = pictures[Math.floor(Math.random() * pictures.length)];

    // 填入 word-captcha-form 元素与 class
    this.captcha_element.classList.add("word-captcha");
    this.captcha_element.innerHTML = `<div class="word-captcha-form">
        <div class="word-captcha-title" id="word-captcha-title" style="display: block;">
            <p>
                请输入
                <h3 class="subtitle">下面图片展示的内容</h3>
            </p>
        </div>
        <div class="word-captcha-image" id="word-captcha-image" style="display: block;">
            <img src="` + path + '/src/randomWords/' + randomPicture + `.png" alt="CAPTCHA"/>
        </div>
        <div class="word-captcha-response" style="display: block;">
            <div class="success" id="word-captcha-response-success" style="display: none;">
                <center><img src="` + path + `/src/Correct.png" width="128" height="128"/></center>
                <br>
                <center>已通过人机验证。</center>
            </div>
            <div class="failure" id="word-captcha-response-failure" style="display: none;">
                <center><img src="` + path + `/src/Incorrect.png" width="128" height="128"/></center>
                <br>
                <center>未通过人机验证。</center>
            </div>
        </div>
        <div class="word-captcha-submit" id="word-captcha-submit" style="display: block;">
            <input type="text" placeholder="请输入内容 (不包括句子，只输入单词)" id="word-captcha-submit-content" class="word-captcha-submit-content"/>
            <button id="word-captcha-submit-button" class="word-captcha-submit-button">提交</button>
        </div>
    </div>`;

    // 密码的 我找半天问题发现 querySelector 填错了我服了我自己
    // 绑定提交事件
    document.getElementById("word-captcha-submit-button").addEventListener("click", function(){
        // 寻找 success 的提示和 failure 的提示
        var success = document.querySelector("#word-captcha-response-success");
        var failure = document.querySelector("#word-captcha-response-failure");

        // 寻找要隐藏的组件
        var title = document.querySelector("#word-captcha-title");
        var image = document.querySelector("#word-captcha-image");
        var submit = document.querySelector("#word-captcha-submit");

        // 判断
        if (!self.checked) {
            var button_self = document.getElementById("word-captcha-submit-button");
            button_self.innerHTML = "请稍等"
            button_self.disabled = true;
            window.setTimeout(function (){
                if (config.CaptchaSuccess) {
                    if (title && image && submit) {
                        title.style.display = "none"; // 隐藏
                        image.style.display = "none";
                        submit.style.display = "none";
                        success.style.display = "";
                        success.classList.add("response-animation");
                    }
                    else {
                        throw new CAPTCHAElementNotFound("额，我也不知道怎么回事.jpg");
                    }
                } else {
                    if (title && image && submit) {
                        title.style.display = "none"; // 隐藏
                        image.style.display = "none";
                        submit.style.display = "none";
                        failure.style.display = "";
                        success.classList.add("response-animation");
                    }
                    else {
                        throw new CAPTCHAElementNotFound("额，我也不知道怎么回事.jpg");
                    }
                }
                self.checked = true;
            }, config.CaptchaDuration);
        }
    });
}