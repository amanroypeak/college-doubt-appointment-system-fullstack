import jwt from 'jsonwebtoken'

// professor auth middleware

const authprofessor = async (req,res,next) => {

    try {

        const {dtoken} = req.headers

        if(!dtoken){

            return res.json({
                success:false,
                message:'Not authorized Login Again'
            })

        }

        const token_decode = jwt.verify(
            dtoken,
            process.env.JWT_SECRET
        )

        req.ProfId = token_decode.id

        next()

    } catch (error) {

        console.log(error)

        res.json({
            success:false,
            message:error.message
        })

    }

}

export default authprofessor