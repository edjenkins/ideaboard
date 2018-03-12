module.exports = {
  domain: 'ideaboard.co.uk',
  instances: {
    default: 'master',
    master: {
      color: '#0099D0'
    },
    citylit: {
      color: '#7e179f',
      subdomain: 'citylit'
    },
    wea: {
      color: '#006172',
      subdomain: 'wea'
    },
    ncl: {
      color: '#003865',
      subdomain: 'ncl'
    },
    openlab: {
      color: '#0099D0',
      subdomain: 'openlab'
    },
    myto: {
      color: '#7DCE82',
      subdomain: 'myto',
      admin: {
        name: 'Myto Admin',
        bio: 'Admin of this site. Please get in touch if you have any issues.',
        email: 'myto@edjenkins.co.uk'
      },
      categories: [
        { tag: 'engaging-with-research', name: 'Engaging with research' },
        { tag: 'gaining-independence', name: 'Gaining independence and taking control' },
        { tag: 'participating-in-activities', name: 'Participating in arts / sport / recreation / music' },
        { tag: 'connecting-with-people', name: 'Connecting with people like me' },
        { tag: 'fertility-and-parenthood', name: 'Fertility and parenthood' },
        { tag: 'other', name: 'Other' }
      ]
    }
  }
}

