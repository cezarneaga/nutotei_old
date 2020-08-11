const path = require('path')

module.exports = {
  siteTitle: `Cârtițele`,
  siteDescription:
    'Ceva descriere: cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
  copyright: `©${new Date().getFullYear()} Valeriu Nicolae`,
  siteTitleShort: 'HSSR',
  siteUrl: 'http://localhost:8000',
  pathPrefix: null,
  logo: path.resolve(__dirname, 'src/assets/images/harta-icon.png'),
  social: {
    twitter: 'https://twitter.com/valeriu',
    facebook: 'https://facebook.com/valeriu.nicolae.39',
  },
  fbAppId: '123',
  lang: 'ro',
}
