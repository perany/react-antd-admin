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

Mock.mock('/local/cs/quick-type/list', 'get', (req) => {
    if(JSON.parse(req.body).page==1){
        return {
            "ret": 0,
            "msg": "success",
            "data": {
                "list": [
                    {
                        "id": 1,
                        "feedback_type": 1,
                        "title": "测试",
                        "content": "测试回复111",
                        "enabled": 1,
                        "created_at": 1552982331,
                        "updated_at": 1552982384,
                        "updated_by": ""
                    },
                    {
                        "id": 2,
                        "feedback_type": 1,
                        "title": "测试",
                        "content": "测试回复1222",
                        "enabled": 1,
                        "created_at": 1552982331,
                        "updated_at": 1552982384,
                        "updated_by": ""
                    },
                    {
                        "id": 3,
                        "feedback_type": 1,
                        "title": "测试",
                        "content": "测试回复1333",
                        "enabled": 1,
                        "created_at": 1552982331,
                        "updated_at": 1552982384,
                        "updated_by": ""
                    },
                ],
                "total": 5,
                "current_page": 1,
                "last_page": 2,
                "per_page": 3
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
                        "feedback_type": 1,
                        "title": "测试",
                        "content": "测试回复44444",
                        "enabled": 1,
                        "created_at": 1552982331,
                        "updated_at": 1552982384,
                        "updated_by": ""
                    },
                    {
                        "id": 5,
                        "feedback_type": 1,
                        "title": "测试",
                        "content": "测试回复55555",
                        "enabled": 1,
                        "created_at": 1552982331,
                        "updated_at": 1552982384,
                        "updated_by": ""
                    }
                ],
                "total": 5,
                "current_page": 2,
                "last_page": 2,
                "per_page": 3
            }
        }
    }

})

