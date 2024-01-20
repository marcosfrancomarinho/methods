class Utility {
    constructor() {
        this.methods = function (arg) {
            return {
                _: (function () {
                    if (typeof arg !== "string") {
                        return arg
                    } else {
                        const elm = document.querySelectorAll(arg)
                        return elm.length > 1 ? elm : elm[0]
                    }
                })(),
                on: function (type, func) {
                    if (this._.length > 1) {
                        this._.forEach((e) => {
                            e.addEventListener(type, func)
                        })
                    } else {
                        this._.addEventListener(type, func)
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
                cssCarousel: function (object, elmt) {
                    const string = Object.keys(object).reduce((united, only) => {
                        return united + (only + ":" + object[only] + "; ")
                    }, "")
                    if (elmt.length > 1) {
                        for (let e of elmt) {
                            e.style = string
                        }
                    } else {
                        elmt.style = string
                    }
                },
                carousel: function (obj) {
                    const container = this._
                    const carousel = container.children[0]
                    const links = carousel.children
                    const width = Number(obj.width.replace("px", ""))
                    let idx = 0
                    //div container - que englopa toda a estrutura do carrossel.
                    this.cssCarousel({
                        "display": "flex",
                        "width": obj.width,
                        "height": obj.height,
                        "overflow": "hidden",
                        "border-radius": "3px"
                    }, container);
                    //div carousel - div que se movimenta.
                    this.cssCarousel({
                        "display": "flex",
                        "transition": "1s all ease-in-out",
                    }, carousel);
                    //elm a - links da imagens que contem a tag img dentro.
                    this.cssCarousel({
                        "display": "flex",
                        "width": obj.width,
                        "height": obj.height,
                        "justify-content": "center",
                        "align-item": "center"
                    }, links)
                    //imagens do carrossel
                    for (let a of links) {
                        this.cssCarousel({
                            "width": obj.width,
                            "height": obj.height
                        }, a.children[0])
                    }
                    //loop do carrossel
                    setInterval(function () {
                        if (idx >= links.length) {
                            idx = 0
                        }
                        carousel.style.transform = `translateX(-${width * idx}px)`
                        idx++
                    }, obj.time)
                }
            }
        }
    }
}
const $ = new Utility().methods
export { $ }






