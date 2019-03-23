import Mock from 'mockjs'

Mock.setup({timeout: '300 - 2200'})

Mock.mock('/local/login', 'post', (req) => {
  const {username, password} = JSON.parse(req.body)
  if (username === 'admin' && password === '123456') {
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

Mock.mock('/local/cs/feedback/list', 'post', (req) => {
  if(JSON.parse(req.body).page==1){
      return {
          "ret": 0,
          "msg": "success",
          "data": {
              "list": [
                  {
                      "id": 1,
                      "user_id": "155143307600002000",
                      "appid": "102",
                      "server": "default",
                      "role_name": "default",
                      "title": "111",
                      "description": "12lj12j\n",
                      "contact": "1111",
                      "created_at": 1551697568,
                      "updated_at": 1551697568,
                      "status": 0,
                      "type": 1,
                      "ip": "127.0.0.1",
                      "customer_service": null,
                      "reply": null
                  },
                  {
                      "id": 2,
                      "user_id": "155143307600002000",
                      "appid": "102",
                      "server": "default",
                      "role_name": "default",
                      "title": "111",
                      "description": "12lj12j\n",
                      "contact": "1111",
                      "created_at": 1551697568,
                      "updated_at": 1551697568,
                      "status": 0,
                      "type": 1,
                      "ip": "127.0.0.1",
                      "customer_service": null,
                      "reply": null
                  },
                  {
                      "id": 3,
                      "user_id": "155143307600002000",
                      "appid": "102",
                      "server": "default",
                      "role_name": "default",
                      "title": "111",
                      "description": "12lj12j\n",
                      "contact": "1111",
                      "created_at": 1551697568,
                      "updated_at": 1551697568,
                      "status": 0,
                      "type": 1,
                      "ip": "127.0.0.1",
                      "customer_service": null,
                      "reply": null
                  }
              ],
              "total": 80,
              "current_page": 1,
              "last_page": 16,
              "per_page": 5
          }
      }
  }else{
      return {
          "ret": 0,
          "msg": "success",
          "data": {
              "list": [
                  {
                      "id": 4,
                      "user_id": "155143307600002000",
                      "appid": "102",
                      "server": "default",
                      "role_name": "default",
                      "title": "111",
                      "description": "12lj12j\n",
                      "contact": "1111",
                      "created_at": 1551697568,
                      "updated_at": 1551697568,
                      "status": 0,
                      "type": 1,
                      "ip": "127.0.0.1",
                      "customer_service": null,
                      "reply": null
                  },
                  {
                      "id": 5,
                      "user_id": "155143307600002000",
                      "appid": "102",
                      "server": "default",
                      "role_name": "default",
                      "title": "111",
                      "description": "12lj12j\n",
                      "contact": "1111",
                      "created_at": 1551697568,
                      "updated_at": 1551697568,
                      "status": 0,
                      "type": 1,
                      "ip": "127.0.0.1",
                      "customer_service": null,
                      "reply": null
                  }
              ],
              "total": 80,
              "current_page": 2,
              "last_page": 16,
              "per_page": 5
          }
      }
  }

})

