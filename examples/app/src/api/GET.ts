import { renderSoe } from "./do";

//@ts-ignore
const GET = (req, res, next) => {
    try {
        const data = renderSoe();
        res.json(data)
    } catch (error) {
        next(error)
    }
}

export default GET;