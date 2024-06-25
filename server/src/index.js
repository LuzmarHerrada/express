import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express()
async function createUser(user) {
    return await prisma.user.create({
      data: user,
    });
}
app.use(express.json())

app.use(express.static('dist'))
// app.get('/', (req, res) => {
// })

app.use('/api', userRoutes)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Listening', 3000)