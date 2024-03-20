const express = require('express');
const { authMiddleware } = require('../middleware');
const {Account} = require('../db')
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
});


router.post('/transfer', authMiddleware,async (req, res) => {
    const { amount, to } = req.body;

    const fromAccount = await Account.findOne({
        userId: req.userId,
    });
    if (fromAccount.balance < amount) {
        return res.status(400).json({ message: "Insufficient Balance!!" })
    };

    const toAccount = await Account.findOne({
        userId: to
    });
    if (!toAccount) {
        return res.status(400).json({ message:"Account not available!!" })
    };

    await Account.updateOne({ userId: req.userId },{ $inc: { balance: -amount } });

    await Account.updateOne({ userId: to },{ $inc: { balance: amount } });


    res.status(200).json({
        message: `Transfer Successful to ${to}`
    });

});

module.exports = router;