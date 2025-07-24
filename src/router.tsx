import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router'
import RootLayout from './components/layout/RootLayout'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import ActivityDetail from './pages/ActivityDetail'
import SpeechField from './components/speech/SpeechField' // 👈 import

const rootRoute = new RootRoute({
  component: RootLayout,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
})

const coursesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/courses',
  component: Courses,
})

const courseDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/courses/$courseId',
  component: CourseDetail,
})

const activityRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/courses/$courseId/activities/$activityId',
  component: ActivityDetail,
})

const transcribeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/transcribe',
  component: SpeechField,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  courseDetailRoute,
  activityRoute,
  transcribeRoute, // 👈 add here
])

export const router = new Router({ routeTree })
export const RouterProviderWrapper = () => <RouterProvider router={router} />
