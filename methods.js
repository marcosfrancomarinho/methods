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
                    if (object.add || object.remove || object.toggle) {
                        const type = Object.keys(object)[0]
                        const value = object[type]
                        if (this._.length > 1) {
                            this._.forEach((e) => {
                                e.classList[type](value)
                            })
                        } else {
                            this._.classList[type](value)
                        }
                    } else {
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
                }
            }
        }
    }
}
const $ = new Utility().methods
export { $ }






