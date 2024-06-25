import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    // res.json(users)
    res.render("index", { title: "Express" });
})

router.get('/users/:id', async (req, res) => {
    const userFound = await prisma.user.findFirst({
        where: {
            id: parseInt(req.params.id),
        },
    });

    if(!userFound)
        return res.status(404).json({ error: "User not found"})

    console.log(userFound)
    return res.json(userFound)
})

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

router.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body,
    })
    res.json(newUser);
});

router.put('/users/:id', async (req, res) => {
    const userUpdate = await prisma.user.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: req.body
    });
    return res.json(userUpdate);
});

router.delete('/users/:id', async (req, res) => {
    const userDelete = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });

    if(!userDelete)
        return res.status(404).json({ error: "User not found"})

    console.log(userDelete)
    return res.json(userDelete)
})

export default router;