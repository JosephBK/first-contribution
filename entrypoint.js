const {Toolkit} = require('actions-toolkit')

const tools = new Toolkit({
  event: ['pull_request.opened']
})

const senderLogin = tools.context.payload.sender.login

main().catch(err => {
  tools.log.fatal(err)
  tools.exit.failure()
})

async function main() {
  const isContributor = await checkIsContributor()

  if (isContributor) {
    tools.exit.neutral()
  } else {
    tools.exit.success()
  }
}

async function checkIsContributor(page = 1) {
  const payload = tools.context.repo({
    page,
    per_page: 100,
    creator: senderLogin,
    state: 'all'
  })

  const {status, data: issues} = await tools.github.issues.listForRepo(payload)

  if (status !== 200) {
    tools.exit.failure(`Received API status code ${status}`)
  }

  if (issues.length === 0) {
    return false
  }

  for (const issue of issues) {
    if (issue.number === tools.context.payload.number) {
      continue
    }

    if (issue.pull_request) {
      return true
    }
  }

  return await checkIsContributor(page + 1)
}
