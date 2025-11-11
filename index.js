const { PrismaClient } = require('./generated/prisma');
const { getUsersWithPosts } = require('./generated/prisma/sql');

const prisma = new PrismaClient()

async function main() {
    // const userWithAddedPost = await prisma.post.create({
    //     data: {
    //         title: "First Post",
    //         authorId: 1,
    //     }
    // })
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    const allPosts = await prisma.post.findMany();
    console.log(allPosts);
    const usersWithPostCount = await prisma.$queryRawTyped(getUsersWithPosts());
    console.log(usersWithPostCount);
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