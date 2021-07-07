<template>
  <div>
    <form>
      <p>
        姓名： <input type="text" v-model="username"/>
      </p>
      <p>
        密码： <input type="text" v-model="password"/>
      </p>
      <p>
        年龄： <input type="text" v-model="age"/>
      </p>
      <p>
        学号： <input type="text" v-model="class_id"/>
      </p>
      <p>
        邮箱： <input type="text" v-model="email"/>
      </p>
      <p>
         <input type="button" value="注册" @click="zhuce"/>
      </p>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        username:'',
        password:'',
        age:'',
        class_id:'',
        email:''
      }
    },
    methods:{
      zhuce(){
        this.$http.post("/api/register",{
          username:this.username,
          password:this.password,
          age:this.age,
          class_id:this.class_id,
          email:this.email
        }).then((res)=>{
          console.log(res);
          if(res.data.code==1){
            alert("注册成功！");
            //path进行组件之间的跳转
            this.$router.push("/login");
           /* this.$router.push({
              path:'/login'
            }); */
            // name 进行组件直接的跳转
            /* this.$router.push({
              name:'login'
            }); */
          }else if(res.data.code==-1){
            alert("用户名或密码为空")
          }else if(res.code==2){
            alert("用户已注册");
          }
        })
      }
    }
  }
</script>

<style>
  form{
    width: 300px;
    margin: 100px auto;
    text-align: center;
  }
  form>p{
    margin-bottom: 20px;
  }
  form>p>input[type=text]{
    width: 240px;
    height: 35px;
    border: none;
    border: 1px solid #cfcfcf;
    border-radius: 5px;
    text-indent: 1em;
  }
 form>p>input[type=button]{
    width: 80px;
    height: 35px;
    border: none;
    background-color: #008800;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
  }
</style>
