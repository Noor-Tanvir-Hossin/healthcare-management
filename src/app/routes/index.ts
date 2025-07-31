import { Router } from "express"
import { userRoutes } from "../user/user.routes"
import { adminRoutes } from "../admin/admin.routes"

const router= Router()

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)



const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/admin',
        route: adminRoutes
    },
   

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router