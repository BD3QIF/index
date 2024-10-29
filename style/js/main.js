window.onload = () => {console.log('二〇二四年 九月(小) 廿八 星期三 甲辰(龙)年 甲戌月 丁卯日 庚子时 霜降 距离立冬还有-22天');}
window.addEventListener('load', () => {
    $('h1').addClass('ready');
    $('.bio').addClass('ready');
    $('li').addClass('ready');
});
document.addEventListener('mousemove', (e) => {
    const [offsetX, offsetY] = [e.x / document.body.clientWidth, e.y / document.body.clientHeight];
    // $('h1').setStyle(`transform`, `translate(${-10 + 20 * offsetX}px,${-10 + 20 * offsetY}px)`);
    $('.bio').setStyle(`transform`, `translate(${5 - 10 * offsetX}px,${-5 + 10 * offsetY}px)`);
});


// window.addEventListener('load', () => {
//     document.querySelectorAll('h1').forEach(function(element) {
//         element.classList.add('ready');
//     });
//     document.querySelectorAll('.bio').forEach(function(element) {
//         element.classList.add('ready');
//     });
//     document.querySelectorAll('li').forEach(function(element) {
//         element.classList.add('ready');
//     });
// });
// document.addEventListener('mousemove', (e) => {
//     const [offsetX, offsetY] = [e.x / document.body.clientWidth, e.y / document.body.clientHeight];
//     document.querySelectorAll('.bio').forEach(function(element) {
//         element.style.transform = `translate(${5 - 10 * offsetX}px, ${5 - 10 * offsetY}px)`;
//     });
//     // document.querySelectorAll('h1').forEach(function(element) {
//     //     element.style.transform = `translate(${-10 + 20 * offsetX}px, ${-10 + 20 * offsetY}px)`;
//     // });
// });

/*background*/
const timer = 350;

addCircles();

function addCircles() {
    setTimeout(() => {
        addCircle(...randomPosition());
        addCircles();
    }, timer);
}

function addCircle(x, y) {
    let circle = document.createElement('div');
    let animationTime = Math.round(Math.random() * 10);
    circle.classList.add('circle');
    circle.style.left = x + 'vw';
    circle.style.top = y + 'vh';
    circle.style.backgroundColor = randomColor();
    circle.style.setProperty('--grow-time', `${animationTime}s`);

    requestAnimationFrame(() => {
        document.body.appendChild(circle);
        setTimeout(removeCircle.bind(this, circle), animationTime * 1000);
    });
}

function removeCircle(circle) {
    document.body.removeChild(circle);
}

function randomPosition() {
    return [
        Math.random() * 95 + 1,
        Math.random() * 90 + 1];
}

function randomColor() {
    const colors = [
        '#81ecec',
        '#74b9ff',
        '#a29bfe',
        '#ffeaa7',
        '#fab1a0',
        '#ff7675',
        '#fd79a8',
    ];
    return colors[Math.round(Math.random() * colors.length)];
}

/*--*/
class Rail {

    static getInstance(selector) {
        if (!Rail.instances) Rail.instances = {};
        if (!Rail.instances[selector]) Rail.instances[selector] = new Rail(selector);
        return Rail.instances[selector];
    }

    static filter(arr, func) {
        const res = [];
        for (let item of arr) if (func(item)) res.push(item);
        return res;
    }

    constructor(selector) {
        this.ele = document.querySelectorAll(selector);
    }

    addClass(className) {
        for (let item of this.ele) {
            const classArr = Rail.filter(item.className.split(' '), (cls) => !!cls);
            classArr.push(className);
            item.className = classArr.join(' ');
        }
        return this;
    }

    removeClass(className) {
        for (let item of this.ele) {
            const classArr = item.className.split(' ');
            item.className = Rail.filter(classArr, (cls) => cls !== className).join(' ');
        }
        return this;
    }

    getOriginalElement(idx) {
        if (!!idx) return this.ele[idx];
        return this.ele;
    }

    setStyle(styleName, styStr) {
        for (let item of this.ele) {
            item.style[styleName] = styStr;
        }
        return this;
    }
}

window.$ = (selector) => {
    return Rail.getInstance(selector);
};
