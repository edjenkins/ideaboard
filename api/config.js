module.exports = {
  domain: 'ideaboard.co.uk',
  instances: {
    default: 'myto',
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
      ],
      tasks: [
        { type: 'discussion', title: 'Implications', description: 'What implications might your team face should you implement your idea?' },
        { type: 'media', title: 'Design photos', description: 'Add photos throughout the day to show the progression of your design' },
        { type: 'poll', title: 'Name your personas', description: 'Add a brief description for each of your team\'s personas' },
        { type: 'appearin', title: 'Live chat', description: 'Have a live discussion about your idea with another group, shout across to their table to get things started!' },
        { type: 'whiteboard', title: 'Draw your subject', description: 'Work together to draw a good image of your subject' }
      ]
    }
  }
}

