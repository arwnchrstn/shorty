import * as yup from "yup"

const URL_REGEX_LONG = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi
// const URL_REGEX_SHORT = /^(?:https:\/\/)+localhost:5173\/[a-zA-Z\d]{6}$/
const URL_REGEX_SHORT = new RegExp(window.location.origin + "\/[a-zA-Z\\d]{6}$", "gi")

export const LongUrlSchema = yup.object({
    longUrl: yup.string().trim().matches(URL_REGEX_LONG, "Invalid URL format")
})
export const ShortUrlSchema = yup.object({
    shortUrl: yup.string().trim().matches(URL_REGEX_SHORT, "Invalid short URL format")
})

export type IShortUrlSchema = yup.InferType<typeof ShortUrlSchema>
export type ILongUrlSchema = yup.InferType<typeof LongUrlSchema>