const { PrismaClient, Prisma } = require('./generated/prisma')

const prisma = new PrismaClient()

async function main() {
    const createUsers = await prisma.user.createMany({
        data: [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Charlie', email: 'charlie@example.com' },
        ],
        skipDuplicates: true, // won't insert users if email already exists
    });

    const users = await prisma.user.findMany();

    console.log(users);
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
