class Utility {
    methods(arg) {
        return {
            _: (function () {
                if (typeof arg !== "string") {
                    return arg
                } else {
                    const elm = document.querySelectorAll(arg)
                    return elm.length > 1 ? elm : elm[0]
                }
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
                } else {
                    return this._.value
                }
            },
            html: function (type) {
                if (type) {
                    return (content) => {
                        this._.innerHTML = content
                    }
                } else {
                    return (content) => {
                        this._.innerText = content
                    }
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
                const width = Number(obj.width.replace("px", ""))
                let size = obj.size == undefined ? "1rem" : obj.size + "rem"
                let idx = 0
                const configBtn = {
                    "position": "absolute",
                    "top": "50%",
                    "transform": "translate(0,-50%)",
                    "cursor": "pointer",
                    "padding": "14px",
                    "border": "none",
                    "outline": "none",
                    "font-size": size,
                    "border-radius": "3px",
                    "opacity": "0.6",
                    "font-weight": "900",
                    "text-aling": "center",
                    "height": "40px",
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center"
                }
                const transition = () => {
                    carousel.style.transform = "translateX(" + (-width * idx) + "px)"
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
                const loop = (() => {
                    setInterval(function () {
                        if (idx >= links.length) {
                            idx = 0
                        }
                        transition()
                        idx++
                    }, obj.time)
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
                    btnLeft.innerText = "❮"
                    btnRight.innerText = "❯"
                })()
                //funções dos botões next & back
                btnLeft.onclick = () => {
                    transition()
                    idx--
                }
                btnRight.onclick = () => {
                    transition()
                    idx++
                }
            }
        }
    }
}
const $ = new Utility().methods
export { $ }
