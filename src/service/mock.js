import Mock from 'mockjs'

Mock.setup({timeout: '300 - 2200'})

Mock.mock('/login', 'post', (req) => {
  const {username, password} = JSON.parse(req.body)
  if (username === 'admin' && password === 'admin') {
    return {
      code: 0,
      data: {
        token: Mock.Random.uuid(),
        username: 'admin'
      }
    }
  } else {
    return {
      code: -1,
      message: 'Invalid username and password'
    }
  }
})
