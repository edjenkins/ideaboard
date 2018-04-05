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
    sensemystreet: {
      color: '#00AAB2',
      subdomain: 'sensemystreet'
    },
    myto: {
      color: '#7DCE82',
      subdomain: 'myto',
      admin: {
        name: 'Myto Admin', 
        bio: 'Admin of this site. Please get in touch if you have any issues.',
        email: 'myto@edjenkins.co.uk'
      },
      document: '<h1>Idea title here...</h1><br /><p>Idea description here...</p>',
      categories: [
        // { tag: 'engaging-with-research', name: 'Engaging with research' },
        // { tag: 'gaining-independence', name: 'Gaining independence and taking control' },
        // { tag: 'participating-in-activities', name: 'Participating in arts / sport / recreation / music' },
        // { tag: 'connecting-with-people', name: 'Connecting with people like me' },
        // { tag: 'fertility-and-parenthood', name: 'Fertility and parenthood' },
        { tag: 'newcastle', name: 'Newcastle, England' },
        { tag: 'netherlands', name: 'Lunteren, Netherlands' },
        { tag: 'rome', name: 'Rome, Italy' },
        { tag: 'other', name: 'Other' }
      ],
      tasks: [
        { type: 'webcam', title: 'Video of your group chat', description: 'Record a short 5 minute video clip of your group having a chat about your idea.' },
        { type: 'discussion', title: 'Other ideas', description: 'Share the ideas that were discussed that helped your group to reach the current idea.' },
        { type: 'poll', title: 'Who will your user/audience be?', description: 'Make a note of who will be the audience for your idea. This might be a group of people or a specific demographic.' },
        { type: 'discussion', title: 'What backs up your idea?', description: 'Can you provide links or evidence that backs up the idea?' },
        // { type: 'whiteboard', title: 'How might your idea look?', description: 'Sketch what your idea might look like. Two people can do this at once!' },
        { type: 'poll', title: 'What risks are inherent to your idea?', description: 'Ideas can face many challenges, discuss some of the issues you might face brining your idea to life.' },
        // { type: 'discussion', title: 'How will we spread the word about it?', description: 'Do you have any techniques for marketing your idea?' },
        // { type: 'discussion', title: 'Who will your partners be?', description: 'It can be really helpful working with a partner (organisation, charity etc.) to bring your idea to life. Who might this partner be?' },
        { type: 'discussion', title: 'Pose a question to the experts!', description: 'Experts are available to answer some questions you might have about your idea. Please ask them below.' }
        // { type: 'discussion', title: 'What form might your idea take?', description: 'Ideas come in many forms, this may be an app, service or a marketing campaign. Discuss the form of your idea below!' }
      ]
    }
  }
}

