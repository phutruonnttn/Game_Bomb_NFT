var utils = utils || {}

utils.String = {
    loadStringPublicAddress: function (str) {
        return str.substr(0,6) + "..." + str.substr(str.length - 4, 4)
    },

    loadStringLimitLength: function (str, length) {
        if (str.length > length) {
            str = str.slice(0, length - 1) + "..."
            return str
        } else {
            return str
        }
    },

    customFormatHour: function (second) {
        if (second < 0) {
            second = 0
        }

        let hour = Math.floor(second / (60 * 60))
        let min = Math.floor((second - hour * 60 * 60) / 60)
        min = min < 10 ? "0" + min : min

        let sec = Math.floor(second - hour * 60 * 60 - min * 60)
        sec = sec < 10 ? "0" + sec : sec

        return min + ":" + sec
    },

    isCharCodeDigit: function (c) {
        return c >= 48 && c <= 57
    },

    formatIntToCurrencyString: function (number) {
        var returnString = ""
        var numberStr = "" + number
        let count = 0
        for (let i=numberStr.length-1; i>=0; i--) {
            count++
            returnString = numberStr[i] + returnString
            if (count === 3 && i !== 0) {
                returnString = "." + returnString
                count = 0;
            }
        }
        return returnString
    },

    format: function (fmt, ...argv) {
        let ch
        let argId = 0
        let prev = 0
        let ret = ''

        for (let i = 0; i < fmt.length; i++) {
            ch = fmt.charCodeAt(i)

            // ch == '%'
            if (ch === 37) {
                if (i === fmt.length - 1) break

                ret = ret + fmt.substring(prev, i)

                ch = fmt.charCodeAt(++i)

                const start = i

                while (this.isCharCodeDigit(ch) && i !== fmt.length - 1) {
                    ch = fmt.charCodeAt(++i)
                }

                const end = i
                prev = i + 1

                const numPad = parseInt(fmt.substring(start, end))

                switch (ch) {
                    case 100:
                        ret = ret + utils.Number.pad(argv[argId++], numPad)
                        break
                    default:
                        throw '[Error]: fmt implement'
                }
            }
        }

        if (prev !== fmt.length - 1) {
            ret = ret + fmt.substring(prev, fmt.length)
        }

        return ret
    }
}