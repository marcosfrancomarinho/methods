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
                }
            }
        }
    }
}
const $ = new Utility().methods
export { $ }






