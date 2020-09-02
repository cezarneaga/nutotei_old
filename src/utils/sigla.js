const alde = '../images/sigla/alde.png'
const plus = '../images/sigla/plus.png'
const pmp = '../images/sigla/pmp.png'
const pnl = '../images/sigla/pnl.png'
const pro = '../images/sigla/pro.png'
const psd = '../images/sigla/psd.png'
const udmr = '../images/sigla/udmr.png'
const usr = '../images/sigla/usr.png'

export function getImage(party) {
  if (!party) {
    return
  } else if (party === 'ALDE') {
    return alde
  } else if (party === 'PLUS') {
    return plus
  } else if (party === 'PMP') {
    return pmp
  } else if (party === 'PNL') {
    return pnl
  } else if (party === 'PRO') {
    return pro
  } else if (party === 'PSD') {
    return psd
  } else if (party === 'UDMR') {
    return udmr
  } else if (party === 'USR') {
    return usr
  } else {
    return
  }
}
