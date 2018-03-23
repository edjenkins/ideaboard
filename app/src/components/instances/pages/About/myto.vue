<template lang="pug">
  #about
    page-header(title="About" subtitle="A little bit about the site and what we are trying to achieve!")
    .row
      .content-block.pull-up.white-block
        .content-block--body
          h2 Myto
          p
            | Any idea invested in from this project will fall under a Creative Commons license – anyone will be free to:
            br
            | Share — copy and redistribute the material in any medium or format;
            br
            | Adapt — remix, transform, and build upon the material;
            br
            | for any purpose, even commercially.
          h5
            | Please don’t submit your ideas unless you are happy for this to happen!
          p
            | By using this site and posting comments and other contributions, you are indicating your consent for your anonymous contributions to be included in a larger programme of research at Newcastle University surrounding mitochondrial disease and the participatory design of ideas for those living with the condition.
            br
            br
            | Investment funds will be awarded commensurate to the amount of effort, work and time that the idea’s production will require. This will be decided by independent experts in software development, as advised by experts within the domains of mitochondrial disease.
            | Invested projects will be announced on the platform, but also via email sign-up lists. The site will also periodically be updated during the process of design and deployment to ensure participants are kept u| to date with the process.
            br
            br
            | Although we are not anticipating that all/any fully-functioning technologies will necessarily be developed as part of invested projects, any technology or platform developed as a part of this competition must be open-source. This is in line with Open Lab at Newcastle University’s long-standing open source policy. Please contact us if you have any more questions about this.
            br
            br
            | If any technology is developed, there will be a handover process whereby the technology will be submitted to the SAgE (at Newcastle University)’s Enterprise Team, will be submitted to ethical approval boards, and then will be made available to the community via the usual channels. This is, of course, highly dependent on the nature of the invested technology.
            | Where the winning idea is a mobile application or piece of software, the developed technology must be compatible with both iOS and Android – this is for reasons of health equality (e.g., not everyone has an iPhone – and this is even more important to pay attention to in challenging contexts such as mitochondrial disease).
            | Output from the project – whether it be participants’ comments during the early stages or invested contributions - may be used in post-promotion publicity.
            | Ideaboard reserves the right to make changes to information published in this guidelines document, including without limitation, specifications and product descriptions, at any time and without notice.

      .content-block.white-block
        .content-block--body
          h2 Ideaboard
          p Say goodbye to surveys!
          p Ideaboard is a revolutionary new way of involving your audience in shaping your latest idea. More than just a feedback tool, Ideaboard lets a community come together to collaboratively design any project.
          p Want to involve your students in the design of a course? How about planning your upcoming event with the help of attendees? Or do you simply want a place where your bookclub buddies can hang out, chat and plan meetups? Ideaboard does all this and more.
          p Getting started on Ideaboard is easy, with a few clicks you can launch your idea page and start inviting people to collaborate and subscribe.
          p Start the conversation straight away in the general discussion, and use custom polls, schedulers and other talking points to start involving your subscribers in shaping your idea.
          p You can post regular updates to keep everyone notified, and use our custom planning tools to organise your idea. 
          p What makes Ideaboard different?
          p Unlike other platforms, Ideaboard is designed with community at its heart. We believe that any idea can be improved by including more passionate voices. That’s why all our tools are open for everyone to use.
          p On Ideaboard, anyone who subscribes to your idea can ask questions, set polls and offer their expertise! So much better than a survey, this is genuine, real collaboration between you and your audience.
          p So what are you waiting for? Start an Idea now!

      .clearfix

    site-footer
</template>

<script>
import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  name: 'about',
  metaInfo: {
    title: 'About',
    description: 'Learn about Ideaboard and the service it provides.'
  },
  components: {
    PageHeader,
    SiteFooter
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'
</style>
