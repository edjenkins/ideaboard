export default {
  domain: 'ideaboard.co.uk',
  driftkey: 'msffsx6pi5gb',
  cdn1: 'https://cdn.ideaboard.co.uk',
  cdn2: 'https://cdn2.ideaboard.co.uk',
  legal: 'https://raw.githubusercontent.com/digitalinteraction/legal/master/ideaboard',
  gakey: 'UA-44963053-17',
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
    sensemystreet: {
      color: '#00AAB2',
      subdomain: 'sensemystreet'
    },
    myto: {
      color: '#0B9BD0',
      subdomain: 'myto'
    },
    wingrove: {
      color: '#096c90',
      subdomain: 'wingrove'
    },
    purdueux: {
      color: '#D6AE58',
      subdomain: 'purdueux'
    },
    healthchecks: {
      color: '#1f3369',
      subdomain: 'healthchecks'
    },
    cell: {
      color: '#0099D0',
      subdomain: 'cell'
    },
    demvr: {
      color: '#fff',
      subdomain: 'cell',
      logoColor: '#363636'
    },
    comtech: {
      color: '#000000',
      subdomain: 'cell',
      logoTitle: 'C&T',
      outcome: {
        ideaDocument: {title: 'Workshop Submission'},
        followIdea: {title: 'Start follow on Idea', hide: true}
      },
      createIdea: {
        title: 'Propose a new workshop',
        subtitle: '',
        inputFields: {
          title: {
            name: 'Topic', placeholder: 'State your workshop topic / theme'
          },
          tagline: {
            name: 'Tagline', placeholder: 'A snappy one-liner about your proposal'
          },
          description: {
            name: 'Description', placeholder: 'Describe your workshop proposal in more detail'
          }
        }
      }
    }
  }
}
