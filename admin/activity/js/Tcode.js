/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-07-17 14:17:43
 * @version $Id$
 */
(function() {
    var flagTcode = window.location.search
    var Tcode = '未知'
    var TcodeIndex = flagTcode.indexOf('Tcode=')
    var otherIndex = flagTcode.indexOf('&', 0)
    if (TcodeIndex > 0) {
        if (otherIndex < 0) {
            Tcode = flagTcode.slice(TcodeIndex + 6, )
        } else {



            Tcode = flagTcode.slice(TcodeIndex + 6, otherIndex)
        }
    }
    Tcode = Tcode.replace('*', '@')
    localStorage["Tcode"] = Tcode
    console.log(Tcode)
})()