const {prisma} = require('../prisma/prisma-client');

const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();
        res.status(200).json(employees);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}