import { FETCH_COURSES } from './courseActionType'
import axios from 'axios'

const rootUrl = 'https://localhost:44347/'
export let userToken = ""
export const fetchCourses = () => {
    return {
        type : FETCH_COURSES
    }
}