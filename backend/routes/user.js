const express = require('express');
const z = require('zod');
const jwt = require('jsonwebtoken');
const {User, Account} = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const router = express.Router();

router.post('/signup', async function (req, res) {
    const payload = req.body;

    const userSchema = z.object({
        username: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string()
    });

    const parsedData = userSchema.safeParse(payload);
    if (!parsedData) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    // To check for existing user.................
    const existingUser = await User.findOne({
        username: payload.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already exists!!"
        })
    };
    // Creating users in database...............
    const user = await User.create({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password
    });

    const userId = user._id;

    // Creating Account----------------
    await Account.create({
        userId:userId,
        balance: 1 + Math.random() * 10000
    });
    // ------------------------------------

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
});



router.post('/signin', async function (req, res) {
    const payload = req.body;
    const signinSchema = z.object({
        username: z.string().email(),
        password: z.string()
    });

    const rightInput = signinSchema.safeParse(payload);

    if (!rightInput) {
        res.status(411).json({
            message: "Wrong Inputs!!"
        })
    };

    const user = await User.findOne({
        username: payload.username,
        password: payload.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            token: token
        });
        return;
    }
    else {
        res.status(411).json({
            message: "User doesn't exits!!"
        });
    }
});



// Updating the user information................
const updateBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
});

router.put("/", authMiddleware, async function (req, res) {
    const payload = req.body;
    const parsedData = updateBody.safeParse(payload);
    if (!parsedData) {
        res.status(411).json({
            message: 'Error while updating information'
        });
        return;
    }

    await User.updateOne({ _id: req.userId }, payload);

    res.status(200).json({
        message: "Updated Successfully"
    })
});


// Getting the user from the database................
router.get("/bulk", async function (req, res) {
    const filter = req.query.filter?.trim() || "";

    // const users = await User.find({
    //     $or: [{
    //         firstName: { '$regex': filter },
    //         lastName: { '$regex': filter }
    //     }]
    // });

    let users = await User.find({}); // Find all users if filter is empty

    if (filter) { 
        users = users.filter(user =>
            user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            user.lastName.toLowerCase().includes(filter.toLowerCase())
        );
    };

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});



module.exports = router;
