const express=require("express")
const app=express()
const bcrypt=require("bcrypt")
app.listen(3000)
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

const users=[]

app.get('/',(req,res)=>{
    res.render('index.ejs',{user:users[0].email})
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.post('/login',(req,res)=>{
    if(users[0].email==req.body.email){
        res.redirect('/')
    }
    else{
        res.redirect('/register')
    }
})

app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.post('/register',async (req,res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password, 10)
        users.push({
            id:Date.now().toString(),
            email:req.body.email,
            password:hashedPassword
        })
        res.redirect('/login')
    }catch{
        res.redirect('/register')
    }
    //console.log(users);
})