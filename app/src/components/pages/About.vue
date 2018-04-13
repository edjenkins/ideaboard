<template lang="pug">
  #about
    page-header(title="About Ideaboard" subtitle="A little bit about the site and what we are trying to achieve")
    .row-wrapper
      .row
        .content-block.pull-up.white-block
          .content-block--body
            p Ideaboard is a new way of involving your friends/community/colleagues in shaping your latest idea. More than just a feedback tool, Ideaboard is a collaborative space to develop any project.
            p Want to involve students in the design of a course? How about planning your upcoming event with the help of attendees? Or do you simply want a place where your bookclub buddies can hang out, chat and plan meetups? Ideaboard does all this and more.
            p Getting started on Ideaboard is easy, with a few clicks you can launch an idea page and start inviting people to subscribe and collaborate.
            p Start the conversation straight away in the general discussion, then you and your community can add 'tasks' such as polls and discussions to help shape your idea.
            p You can post regular updates to keep everyone notified, and use our custom planning tools to organise your idea. 
            p What makes Ideaboard different?
            p Unlike other platforms, Ideaboard is designed with community at its heart. We believe that any idea can be improved by including more passionate voices. That’s why all our tools are open for everyone to use.
            p On Ideaboard, anyone who subscribes to your idea can ask questions, set polls and offer their expertise! So much better than a survey, this is genuine, real collaboration between you and your audience.
            p So what are you waiting for?

            start-button

        .clearfix
    site-footer
</template>

<script>
import PageHeader from '@/components/PageHeader'
import StartButton from '@/components/shared/StartButton'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  name: 'about',
  metaInfo: {
    title: 'About',
    description: 'Learn about Ideaboard and the service it provides.'
  },
  components: {
    PageHeader,
    StartButton,
    SiteFooter
  }
}
</script>
