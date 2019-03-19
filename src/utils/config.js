/**
 * global configuration
 * @type {{copyright: string, logoPath: string, siteName: string, i18n: {defaultLanguage: string, languages: *[]}}}
 */
module.exports = {
  siteName: '海外客服系统',
  copyright: `react-antd-admin ©${new Date().getFullYear()} Created by perany`,
  logoPath: '/Combined-Shape@2x.png',
  adminBasePath: '/app',

  /* I18n configuration */
  i18n: {
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'en'
  }
}
