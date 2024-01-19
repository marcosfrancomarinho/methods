class Utility {
    constructor() {
        this.methods = function (arg) {
            return {
                _: (function () {
                    if (typeof arg !== "string") {
                        return arg
                    } else {
                        const _ = document.querySelectorAll(arg)
                        return _.length > 1 ? _ : _[0]
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







