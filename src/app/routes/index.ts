import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { adminRoutes } from "../modules/admin/admin.routes"
import { authroutes } from "../modules/auth/auth.routes"
import { specialtiesRoutes } from "../modules/specialties/specialties.routes"
import { DoctorRoutes } from "../modules/doctor/doctor.routes"

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
    {
        path: '/doctor',
        route: DoctorRoutes
    },
   

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router