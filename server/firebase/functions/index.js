const
  pako = require('pako'),
  functions = require('firebase-functions'),
  config = functions.config(),
  admin = require('firebase-admin')

admin.initializeApp(config.firebase)


const makeEmptyAccount = () => ({
  live: {
    mainCurrencyCode: 'RUB',
  },
  encrypted: false,
  version: 6,
})


exports.onUserRegistered = functions.auth.user().onCreate(event => {
  const
    user = event.data,
    newAccount = Object.assign({}, makeEmptyAccount(), { user }),
    accountRef = admin.database().ref('/accounts').child(user.uid)

  return accountRef.update(newAccount).then(() => {
    return sendEmail({
      targetEmail: user.email,
      subject: 'Thanks and welcome',
      text: 'Your registration in Planyourmoney was successful',
    })
  })
})

exports.backupSendWorker = functions.database
  .ref('/service/sendBackup/{uid}').onWrite(event => {
    const data = event.data.val()

    if (!data) {
      return Promise.resolve()
    }
    const { email, done } = data

    if (done) {
      return Promise.resolve()
    }

    return new Promise(
      (resolve) => admin.database().ref(`/accounts/${event.params.uid}`).once('value', (accountRef) => {
        return sendEmail({
          targetEmail: email,
          subject: 'This is your daily backup from Planyourmoney',
          text: 'You can restore your account using attached backup.',
          attachments: [
            {   // utf-8 string as an attachment
              filename: `backup-${new Date().toISOString().substring(0, 10)}.gz`,
              content: pako.deflate(JSON.stringify(accountRef.val()), { to: 'string' }),
            },
          ],
        })
          .then(() => {
            return event.data.adminRef.update({
              email,
              done: true,
              rnd: null,
            }).then(() => {
              resolve()
              return null
            })
          })
      }))
  })

exports.daily_job =
  functions.pubsub.topic('daily-tick').onPublish(() => {
    return new Promise((resolve) => {
      admin.database().ref('/personalData').once('value', (personalDataRef) => {
        const personalData = personalDataRef.val()
        const work = Object.keys(personalData).reduce((acc, uid) => {
          const { backupEmail } = personalData[uid]

          if (backupEmail) {
            acc[uid] = { email: backupEmail, done: false, rnd: Math.random() }
          }

          return acc
        }, {})

        return admin.database().ref('/service').child('sendBackup').update(work)
          .then(() => {
            console.log('saved to db.')
            resolve()
            return null
          })
      })
    })
  })

exports.currenciesUpdate =
  functions.pubsub.topic('update-currencies').onPublish(() => {
    return new Promise((resolve) => {
      const oxr = require('./oxr')
      oxr.set({ app_id: 'f9123ceb379e4a329a95017bcda90f29' })

      oxr.latest(() => {
        admin.database()
          .ref('/currencies')
          .child('live')
          .update(oxr.rates)
          .then(() => {
            resolve()
            return null
          })
      })
    })
  })


const nodemailer = require('nodemailer')
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent('planyourmoneyapp@gmail.com')
const gmailPassword = encodeURIComponent('defender4796062')
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`)

// Sends an email confirmation when a user changes his mailing list subscription.
function sendEmail({ targetEmail, subject, text, attachments }) {
  const mailOptions = {
    from: '"Planyourmoney." <noreply@planyourmoney.com>',
    to: targetEmail,
    subject,
    text,
    attachments,
  }

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Email sent to:', targetEmail)
  }).catch(error => {
    console.error('There was an error while sending the email:', error)
  })
}
