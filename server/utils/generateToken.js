import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    const SECRET = process.env.SECRET_KEY;
    if (!SECRET) throw new Error("JWT Secret missing!");
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1d" });

    return res.status(200).cookie("token", token,
        {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        }
    ).json(
        {
            success: true,
            message: "login successfully",
            user
        }
    )
}