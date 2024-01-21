class Utility {
    methods(arg) {
        return {
            _: (function () {
                if (typeof arg !== "string") {
                    return arg
                }
                const elm = document.querySelectorAll(arg)
                return elm.length > 1 ? elm : elm[0]
            })(),
            on: function (event, func) {
                if (this._.length > 1) {
                    this._.forEach((e) => {
                        e.addEventListener(event, func)
                    })
                } else {
                    this._.addEventListener(event, func)
                }
            },
            css: function (object) {
                if (object.add || object.remove || object.toggle) {//classList
                    const type = Object.keys(object)[0]
                    const value = object[type]
                    if (this._.length > 1) {
                        this._.forEach((e) => {
                            e.classList[type](value)
                        })
                    } else {
                        this._.classList[type](value)
                    }
                } else { // CSS inline. 
                    const string = Object.keys(object).reduce((united, only) => {
                        return united + (only + ":" + object[only] + "; ")
                    }, "")
                    if (this._.length > 1) {
                        this._.forEach((e) => {
                            e.style = string
                        })
                    } else {
                        this._.style = string
                    }
                }
            },
            val: function (str) {
                if (str === "text") {
                    return this._.innerText
                }
                return this._.value
            },
            html: function (type) {
                if (type) {
                    return (content) => {
                        this._.innerHTML = content
                    }
                }
                return (content) => {
                    this._.innerText = content
                }
            },
            style: function (object, elmt) {
                const string = Object.keys(object).reduce((united, only) => {
                    return united + (only + ":" + object[only] + "; ")
                }, "")
                elmt.style = string
            },
            carousel: function (obj) {
                const container = this._
                const carousel = container.children[0]
                const links = carousel.children
                const btnLeft = container.children[1]
                const btnRight = container.children[2]
                const measure = obj.width.substr(-2)//px-em-vw-vh-pt/ ñ => rem-%.
                const width = Number.parseFloat(obj.width)
                const size = obj.size === undefined ? "1.3rem" : obj.size + "rem"
                const time = obj.time === undefined ? false : obj.time
                let idx = 0
                const configBtn = {
                    "position": "absolute",
                    "top": "50%",
                    "transform": "translate(0,-50%)",
                    "cursor": "pointer",
                    "padding": "10px",
                    "border": "1px inset rgba(255,255,255, 0.2)",
                    "outline": "none",
                    "font-size": size,
                    "border-radius": "3px",
                    "background": "rgba(255,255,255, 0.3)",
                    "font-weight": "900",
                    "text-aling": "center",
                    "height": "40px",
                    "min-width": "40px",
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "padding-inline": "0",
                    "border-radius": "100%",
                    "text-shadow": "0.3px 0.3px white",
                    "transition": "all 0.6s"
                }
                const transition = () => {
                    carousel.style.transform = "translateX(" + (-width * idx) + measure + ")"
                }
                //div container - que englopa toda a estrutura do carrossel.
                this.style({
                    "display": "flex",
                    "width": obj.width,
                    "height": obj.height,
                    "overflow": "hidden",
                    "border-radius": "3px",
                    "position": "relative"
                }, container);
                //div carousel - div que se movimenta.
                this.style({
                    "display": "flex",
                    "transition": "1s all ease-in-out",
                }, carousel);
                //elm a - links da imagens que contem a tag img dentro.
                this.style({
                    "display": "flex",
                    "width": obj.width,
                    "height": obj.height,
                    "justify-content": "center",
                    "align-item": "center",
                }, links)
                //imagens do carrossel
                for (let a of links) {
                    this.style({
                        "width": obj.width,
                        "height": obj.height
                    }, a.children[0])
                }
                //loop do carrossel.
                (function loopCarousel() {
                    if (time) {
                        setInterval(function () {
                            if (idx >= links.length) {
                                idx = 0
                            }
                            transition()
                            idx++
                        }, time)
                    }
                })()
                // cnfiguração dos botões
                this.style({
                    ...configBtn,
                    "left": "5px",
                }, btnLeft)
                this.style({
                    ...configBtn,
                    "right": "5px",
                }, btnRight)
                // conteudo botões.
                const content = (() => {
                    btnRight.innerHTML = "&#10095"
                    btnLeft.innerHTML = "&#x276E;"
                })()
                btnLeft.onmouseenter = () => {
                    this.style({
                        ...configBtn,
                        "left": "5px",
                        "background": "rgba(255,255,255, 0.6)",
                    }, btnLeft)
                }
                btnRight.onmouseenter = () => {
                    this.style({
                        ...configBtn,
                        "right": "5px",
                        "background": "rgba(255,255,255, 0.6)",
                    }, btnRight)
                }
                btnLeft.onmouseout = () => {
                    this.style({
                        ...configBtn,
                        "left": "5px",
                        "background": "rgba(255,255,255, 0.3)",
                    }, btnLeft)
                }
                btnRight.onmouseout = () => {
                    this.style({
                        ...configBtn,
                        "right": "5px",
                        "background": "rgba(255,255,255, 0.3)",
                    }, btnRight)
                }
                //funções dos botões next & back
                btnLeft.onclick = () => {
                    idx--
                    if (idx <= 0) {
                        idx = 0
                    }
                    transition()
                }
                btnRight.onclick = () => {
                    idx++
                    if (idx >= links.length) {
                        idx = 0
                    }
                    transition()
                }
            }
        }
    }
}
const $ = new Utility().methods
export { $ }
