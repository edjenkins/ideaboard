const Report = require('../../app/models/report')

module.exports = function (app, passport) {
  // Report content
  app.post('/moderate/report',
    async (req, res) => {
      // TODO: Check permissions to report
      const data = {
        _target: req.body.id,
        _user: req.user,
        type: req.body.type
      }
      const newReport = new Report(data)
      const report = await newReport.save()
      
      res.json(report)
    })
}
