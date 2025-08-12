import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { adminRoutes } from "../modules/admin/admin.routes"
import { authroutes } from "../modules/auth/auth.routes"
import { specialtiesRoutes } from "../modules/specialties/specialties.routes"

const router= Router()

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/admin',
        route: adminRoutes
    },
    {
        path: '/auth',
        route: authroutes
    },
    {
        path: '/specialties',
        route: specialtiesRoutes
    },
   

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router