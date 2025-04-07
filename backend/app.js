 import express from 'express'
 import mongoose from 'mongoose'
 import cookieParser from 'cookie-parser'
 import cors from 'cors'
 import { Schema, model } from 'mongoose'
 const Url = 'mongodb://localhost:27017'

 const app = express()
 app.use(express.json())
 app.use(cors({
    origin: ['http://127.0.0.1:5500'],
    credentials: true,}))
 app.use(cookieParser())

 const db = async(_req, _res) =>{
    try {
        await mongoose.connect(Url)
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.error(error)
    }
 }

 const user = new Schema({
    name: String,
    email: String,
    password: String,
 })
 const User = model('User', user)

 app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const findUser = await  User.findOne({email})
        if(findUser){
            return res.status(400).json({msg: "Ese correo electrónico ya existe"})
        }
        const newUser = User.create({
            name,
            email,
            password,
        })
        return res.status(201).json({msg: "Usuario creado correctamente", newUser})
    } catch (error) {
        console.log(error)
    }
 })

 app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ msg: "Usuario no encontrado" })
        }
        const iniciarSesion = await User.findOne({ email, password })
        res.cookie("token", iniciarSesion._id, {
            httpOnly: true,
            sameSite: "strict",
          })
        return res.status(200).json({ msg: "Inicio de sesión exitoso", iniciarSesion })
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msg: "Error del servidor" })
    }
 })

 app.get("/api/user", async (req, res) => {
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({msg: "No estás autenticado"})
        }
        return res.status(201).json({msg: "Usuario autenticado"})
    } catch (error) {
        console.log(error)
    }
 })




 app.listen(3000, () => {
    db ()
    console.log(`Server corriendo en el puerto: 3000`)
 })