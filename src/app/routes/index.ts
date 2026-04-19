import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { adminRoutes } from "../modules/admin/admin.routes"
import { authroutes } from "../modules/auth/auth.routes"
import { specialtiesRoutes } from "../modules/specialties/specialties.routes"
import { DoctorRoutes } from "../modules/doctor/doctor.routes"
import { PatientRoutes } from "../modules/patient/patient.route"
import { SchedulesRoutes } from "../modules/schedules/schedules.route"
import { DoctorSchedulesRoutes } from "../modules/DoctorSchedule/doctorSchedule.routes"
import { AppointmentRoutes } from "../modules/appoinment/appoinment.route"
import { PaymentRoutes } from "../modules/payment/payment.routes"

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
    {
        path: '/patient',
        route: PatientRoutes
    },
    {
        path: '/schedules',
        route: SchedulesRoutes
    },
    {
        path: '/doctor-schedules',
        route: DoctorSchedulesRoutes
    },
    {
        path: '/appoinments',
        route: AppointmentRoutes 
    },
    {
        path: '/payment',
        route: PaymentRoutes
    }
   

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router